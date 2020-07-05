import { NgModule } from '@angular/core';
import { StripePaymentFormComponent } from './stripe-payment-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StripePaymentService } from './stripe-payment.service';
@NgModule({
  declarations: [StripePaymentFormComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [StripePaymentFormComponent],
  providers: [StripePaymentService]
})
export class StripePaymentFormModule { }
