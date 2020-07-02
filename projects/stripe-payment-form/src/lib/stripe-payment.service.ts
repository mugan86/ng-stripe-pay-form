import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Stripe, StripeCard } from '@fireflysemantics/angular-stripe-service/lib/types';

@Injectable({
  providedIn: 'root'
})
export class StripePaymentService {
  // Para gestionar el token de la tarjeta para poder procesar el pago
  public cardTokenVar = new Subject<string>();
  public cardTokenVar$ = this.cardTokenVar.asObservable();
  public getTokenVar = new Subject<boolean>();
  public getTokenVar$ = this.getTokenVar.asObservable();
  constructor() { }
  public updateCardToken(newValue: string) {
    this.cardTokenVar.next(newValue);
  }
  public takeCardToken(newValue: boolean) {
    this.getTokenVar.next(newValue);
  }
  async createToken(stripe: Stripe, card: StripeCard) {
    const { token, error } = await stripe.createToken(card);

    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Success!', token);
      this.updateCardToken(token.id);
    }
  }
}
