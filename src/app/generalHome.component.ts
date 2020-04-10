import { Component, Input, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { UtilityService } from './core/utility.service';
@Component({
  selector: 'app-generalhome',
  template: `<div style="height: 100px; background-color: blue">
  <button (click)="onButtonClick()">click here to change the color</button>
  </div>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class GeneralHomeComponent  implements OnInit{
  @Input() name: string;
   constructor(private service: AppService, private utility: UtilityService) { }

ngOnInit() {}
  onButtonClick() {

this.service.getData().subscribe(
        res => {
          this.utility.isUserLoggedIn.next(true);
        });
  }
}
