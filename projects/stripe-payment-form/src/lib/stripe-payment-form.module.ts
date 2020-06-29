import { NgModule, ModuleWithProviders } from '@angular/core';
import { StripePaymentFormComponent } from './stripe-payment-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './only-number.directive';
import { CapitalizePipe } from './capitalize.pipe';
@NgModule({
  declarations: [StripePaymentFormComponent, OnlyNumberDirective, CapitalizePipe],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [StripePaymentFormComponent]
})
export class StripePaymentFormModule { }
