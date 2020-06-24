import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stripe';
  key = 'pk_test_Jsle6ueM2m2SIEFUhiENzX5Y00eBZTSEKf';
  takeToken($event) {
    console.log('cardOk', $event);
  }
}
