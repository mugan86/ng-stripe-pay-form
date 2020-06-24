import { NgModule, ModuleWithProviders } from '@angular/core';
import { StripePaymentFormComponent } from './stripe-payment-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { throwError } from 'rxjs/internal/observable/throwError';
@NgModule({
  declarations: [StripePaymentFormComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [StripePaymentFormComponent]
})
export class StripePaymentFormModule { }
