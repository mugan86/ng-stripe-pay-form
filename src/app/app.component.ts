import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StripePaymentService } from 'projects/stripe-payment-form/src/lib/stripe-payment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stripe';
  key = environment.stripePublicKey;
  token: string;
  constructor(private stripePaymentService: StripePaymentService) {
    this.stripePaymentService.cardTokenVar$.subscribe((token: string) => {
      console.log('datos tarjeta ok');
      this.token = token;
      console.log(this.token);
    });
  }
  takeToken() {
    this.stripePaymentService.takeCardToken(true);
  }
}
