import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { StripePaymentFormService } from './stripe-payment-form.service';

@Component({
  selector: 'ng-stripe-pay-stripe-payment-form',
  templateUrl: './stripe-payment-form.component.html',
  styles: [],
})
export class StripePaymentFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;

  stripe;
  loading = false;
  confirmation;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  constructor(
    private cd: ChangeDetectorRef,
    private stripeService: AngularStripeService,
    private stripeLibServiceConfig: StripePaymentFormService
  ) {}
  // 'pk_test_odGrnRj66SzJob5DtWPXMcZf00SggMwP4d'
  ngAfterViewInit() {
    this.stripeService
      .setPublishableKey(this.stripeLibServiceConfig.publicKey)
      .then((stripe) => {
        this.stripe = stripe;
        const elements = stripe.elements();
        this.card = elements.create('card', {
          hidePostalCode: true,
        });
        this.card.mount(this.cardInfo.nativeElement);
        this.card.addEventListener('change', this.cardHandler);
      });
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit() {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Success!', token);
    }
  }
}
