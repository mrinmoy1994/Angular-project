import { Component, OnInit } from '@angular/core';
import { UrlConfiguration, match, contest, player } from './../core/url-configuration';
import { UtilityService } from './../core/utility.service';
import { CreateteamService } from './../create-team/createteam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-contest',
  templateUrl: './open-contest.component.html',
  styleUrls: ['./open-contest.component.scss']
})
export class OpenContestComponent implements OnInit {
  text:any = {
    Days: "",
    Hours: "",
    Minutes: "",
    Seconds: ""
  };
  currentMatch: match;
  contests : contest[];
  currentContests : contest[]=[];
  constructor( private router: Router, private util : UtilityService, private service : CreateteamService ) { 
  }

  ngOnInit(): void {
    if(!this.util.currentMatch){
      this.router.navigateByUrl("/home");
    }
    this.currentMatch = this.util.currentMatch; 
    
    console.log("currentContests");

    console.log(this.currentContests);
    this.contests = this.util.contests;

    if(this.contests)
    {
      for(let contest of this.contests){
        if(contest.matchId == this.currentMatch.id){
          this.currentContests.push(contest);
        }
      }
    }
    console.log(this.currentContests);
  }
}
