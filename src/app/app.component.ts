import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IStripePaymentCard } from 'projects/stripe-payment-form/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stripe';
  getCardData($event: IStripePaymentCard) {
    console.log('cardOk', $event);
  }
}
