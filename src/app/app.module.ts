import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StripePaymentFormModule } from 'projects/stripe-payment-form/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StripePaymentFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
