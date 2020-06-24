import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StripePaymentFormModule } from 'stripe-payment-form';

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
