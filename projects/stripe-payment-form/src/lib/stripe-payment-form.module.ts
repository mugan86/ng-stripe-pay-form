import { NgModule } from '@angular/core';
import { StripePaymentFormComponent } from './stripe-payment-form.component';
import { FormsModule } from '@angular/forms';
import { throwError } from 'rxjs/internal/observable/throwError';
import { StripePaymentFormService } from './stripe-payment-form.service';

@NgModule({
  declarations: [StripePaymentFormComponent],
  imports: [
    FormsModule
  ],
  exports: [StripePaymentFormComponent]
})
export class StripePaymentFormModule {
  public static forRoot(config: {publicKey: string}) {
    if (config.publicKey === undefined || config.publicKey === null || config.publicKey === '') {
      throwError('Api key no introducida');
    }
    return {
      ngModule: StripePaymentFormModule,
      providers: [
        StripePaymentFormService,
        {
          provide: 'config',
          useValue: config
        }
      ]
    };
  }
}
