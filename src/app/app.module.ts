import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StripePaymentFormModule } from 'stripe-payment-form';
const config = {
  publicKey: 'pk_test_Jsle6ueM2m2SIEFUhiENzX5Y00eBZTSEKf'
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StripePaymentFormModule // .forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
