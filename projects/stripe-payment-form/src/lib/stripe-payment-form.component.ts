import {
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import creditCardType from 'credit-card-type';
import { IStripePaymentCard } from './stripe-payment-card.interface';
@Component({
  selector: 'ng-stripe-pay-form',
  templateUrl: './stripe-payment-form.component.html',
  styles: [
    `
    .card-brand {
      font-size: 16px;
      margin-bottom: 5px;
    }
    `
  ]
})
export class StripePaymentFormComponent implements OnInit {
  loading = false;
  @Output() cardData = new EventEmitter<IStripePaymentCard>();
  error: string;
  months: Array<{value: number, label: string}> = [];
  years: Array<number> = [];
  card: IStripePaymentCard = {
    number: '',
    expMonth: new Date().getMonth() + 1,
    expYear: new Date().getFullYear(),
    valid: false,
    type: '',
    cvc: '',
    securityCode: {
      name: '',
      size: 0
    }
  };

  ngOnInit() {
    console.log(this.card.expYear);
    this.months = [
      {
        value: 1,
        label: 'Enero'
      },
      {
        value: 2,
        label: 'Febrero',
      },
      {
        value: 3,
        label: 'Marzo'
      },
      {
        value: 4,
        label: 'Abril'
      },
      {
        value: 5,
        label: 'Mayo'
      }, {
        value: 6,
        label: 'Junio'
      },
      {
        value: 7,
        label: 'Julio'
      },
      {
        value: 8,
        label: 'Agosto'
      }, {
        value: 9,
        label: 'Septiembre'
      },
      {
        value: 10,
        label: 'Octubre'
      },
      {
        value: 11,
        label: 'Noviembre'
      },
      {
        value: 12,
        label: 'Diciembre'
      },
    ];

    for (let yearPos = 0; yearPos < 20; yearPos++) {
      this.years.push(new Date().getFullYear() + yearPos);
    }
  }
  cardStatusCheck() {
    this.luhnCheck();
  }

  luhnCheck(){
    const ccNum = this.card.number;
    const ccNumSplit: any = ccNum.split('');
    let sum = 0;

    const singleNums = [];
    let doubleNums = [];
    let finalArry;
    this.card.valid = false;

    if ((!/\d{15,16}(~\W[a-zA-Z])*$/g.test(ccNum)) || (ccNum.length > 16)){
       return false;
    }

    if (ccNum.length === 15){  // american express
       for (let numberValue = ccNumSplit.length - 1; numberValue >= 0; numberValue--){
          if (numberValue  % 2 === 0){
             singleNums.push(ccNumSplit[numberValue]);
          }else{
             doubleNums.push((ccNumSplit[numberValue] * 2).toString());
          }
       }
    }else if (ccNum.length === 16){
       for (let numberValue = ccNumSplit.length - 1; numberValue >= 0; numberValue--){
          if (numberValue % 2 !== 0){
             singleNums.push(ccNumSplit[numberValue]);
          }else{
             doubleNums.push((ccNumSplit[numberValue] * 2).toString());
          }
       }
    }
    // joining makes an array to a string and I split them up again
    // so that every number is a single digit and convert back to array

    doubleNums = doubleNums.join('').split('');
    finalArry = doubleNums.concat(singleNums);

    let j = 0;
    finalArry.map( () => {
      sum += +(finalArry[j]);
      j++;
    });
    /*for (let j = 0; j< finalArry.length; j++){
       sum += +(finalArry[j]);
    }*/

    if (sum % 10 === 0){
       this.card.valid = true;
    }
    // the console log is for you, so you can see the sum, all sums that are
    // divisible by 10 should be good.  Just open up your console to view.
    // console.log(sum);
    console.log(creditCardType(ccNum)[0]);
    const creditCard = creditCardType(ccNum)[0];
    this.card.type = creditCard.type;
    this.card.securityCode.name = creditCard.code.name;
    this.card.securityCode.size = creditCard.code.size;
    /*if (this.card.cvc.length === 3 && this.card.type !== 'american-express' ||
      this.card.cvc.length === 4 && this.card.type === 'american-express') {
        console.log('cvc ok', this.card.type, this.card.cvc.length);
        validCard = true;
    } else {
      validCard = false;
    }*/
    if (this.card.expYear < new Date().getFullYear() ||
    this.card.expYear <= new Date().getFullYear() && this.card.expMonth <= (new Date().getMonth() + 1)) {
      console.log('Fecha de la tarjeta superada');
      this.card.valid = false;
    }
    if (this.card.securityCode.size !== this.card.cvc.length) {
      console.log('Código incorrecto - Longitud no correcta');
      this.card.valid = false;
    }
    this.sendNotificationStatus();
  }

  sendNotificationStatus() {
    this.cardData.emit(this.card);
  }
}
