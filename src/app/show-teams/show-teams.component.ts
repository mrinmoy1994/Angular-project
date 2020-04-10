import { Component, OnInit } from '@angular/core';
import { UrlConfiguration, match, contest, player, Team } from './../core/url-configuration';
import { UtilityService } from './../core/utility.service';
import { ShowTeamsService } from './show-teams.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-teams',
  templateUrl: './show-teams.component.html',
  styleUrls: ['./show-teams.component.scss']
})
export class ShowTeamsComponent implements OnInit {
  text:any = {
    Days: "",
    Hours: "",
    Minutes: "",
    Seconds: ""
  };
  
  currentMatch: match;
  teams : any[];
  constructor( private router: Router, private util : UtilityService, private service : ShowTeamsService ) { 
  }
  ngOnInit(): void {

    if(!this.util.currentMatch){
      this.router.navigateByUrl("/home");
    }
    this.currentMatch = this.util.currentMatch;
    console.log(this.currentMatch);
    this.service.getTeamsData(this.currentMatch.id).subscribe(
      data => {
        this.teams = data.data as Team[];
        console.log(this.teams);
      },
      error => {
        console.log(error);
      });
    
  }

}
