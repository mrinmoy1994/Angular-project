import { Component, Input } from '@angular/core';
import { UtilityService } from './core/utility.service';
@Component({
  selector: 'hello',
  template: `<div *ngIf="isUserLoggedIn" style="height: 100px; background-color: red">x</div>
  <div *ngIf="!isUserLoggedIn" style="height: 100px; background-color: green">y</div>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
  isUserLoggedIn = false;
  constructor(private utility: UtilityService) {
    this.utility.isUserLoggedIn.subscribe( value => {
       this.isUserLoggedIn = value;
  });
}
}
