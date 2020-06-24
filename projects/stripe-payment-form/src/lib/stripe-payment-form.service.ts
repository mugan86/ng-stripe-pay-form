import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripePaymentFormService {
  publicKey: string;
  constructor(@Inject('config') private config: { publicKey: string, showLog: boolean}) {
    this.publicKey = this.config.publicKey;
    if (this.config.showLog) {
      console.log('Public Key Stripe: ', this.publicKey);
    }
  }
}

