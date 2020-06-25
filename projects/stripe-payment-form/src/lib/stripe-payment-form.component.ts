import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { AngularStripeService } from '@fireflysemantics/angular-stripe-service';
import { throwError } from 'rxjs';

@Component({
  selector: 'ng-stripe-pay-form',
  templateUrl: './stripe-payment-form.component.html',
  styles: [
    `
      #pay-form {
        width: 100%;
        max-width: 900px;
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
        margin: 0 auto;
        max-width: 150px;
        width: 80%;
        background-color: #343a40;
        border-color: #343a40;
        display: inline-block;
        font-weight: 400;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        font-size: 18px;
        padding: 8px 10px;
        border-radius: 4px;
      }

      form.checkout button:active {
        background: #08090a;
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

      #pay-form {
        display: block !important;
        margin-bottom: 10px !important;
      }

      #card-img {
        width: 100%;
        height: 100%;
        max-width: 150px;
      }

      .vertical-center {
        text-align: center;
        width: 100%;
      }

      .form-inline {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
      }
    `,
  ],
})
export class StripePaymentFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
  @Input() hidePostalCode = true;
  @Input() key = '';
  @Input() payMoneyInfo = '';
  stripe;
  loading = false;
  @Output() cardOk = new EventEmitter<any>();
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  constructor(
    private cd: ChangeDetectorRef,
    private stripeService: AngularStripeService
  ) {}
  ngAfterViewInit() {
    if (this.key === '' || this.key === undefined || this.key === null) {
      throwError('Necesario Public Key');
    }
    this.stripeService.setPublishableKey(this.key).then((stripe) => {
      this.stripe = stripe;
      const elements = stripe.elements();
      this.card = elements.create('card', {
        hidePostalCode: this.hidePostalCode,
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
      this.cardOk.emit(token);
    }
  }
}
