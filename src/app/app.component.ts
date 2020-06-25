import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stripe';
  key = environment.stripePublicKey;
  takeToken($event) {
    console.log('cardOk', $event);
  }
}
