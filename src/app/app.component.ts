import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from './core/utility.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  name = 'Angular';
  isheaderFooterNeeded = true;
  constructor(private router: Router, private utility: UtilityService) {
    console.log(this.router.url);
    this.utility.isHeaderFooterNeeded.subscribe( value => {
      console.log(value);
      this.isheaderFooterNeeded = value;
 });
  }
}
