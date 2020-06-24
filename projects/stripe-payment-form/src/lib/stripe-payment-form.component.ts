import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';

@Component({
  selector: 'ng-stripe-pay-payment-form',
  templateUrl: './stripe-payment-form.component.html',
  styles: [
    `
      form.checkout {
        max-width: 500px;
        margin: 2rem auto;
        text-align: center;
        border: 2px solid #eee;
        border-radius: 8px;
        padding: 1rem 2rem;
        background: white;

        font-family: monospace;
        color: #525252;
        font-size: 1.1rem;
      }

      form.checkout button {
        padding: 0.5rem 1rem;
        color: white;
        background: coral;
        border: none;
        border-radius: 4px;
        margin-top: 1rem;
      }

      form.checkout button:active {
        background: rgb(165, 76, 43);
      }

      #card-info {
        margin-top: 15px;
      }

      #card-errors {
        margin-top: 10px;
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
        padding: 10px;
      }
    `,
  ],
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
    private stripeService: AngularStripeService
  ) {}
  // 'pk_test_odGrnRj66SzJob5DtWPXMcZf00SggMwP4d'
  ngAfterViewInit() {
    this.stripeService
      .setPublishableKey('pk_test_Jsle6ueM2m2SIEFUhiENzX5Y00eBZTSEKf')
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
