import { Component } from '@angular/core';
import { routingAnimation } from './core/animations/routing.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routingAnimation]
})
export class AppComponent {
  title = 'ClientApp';
}
