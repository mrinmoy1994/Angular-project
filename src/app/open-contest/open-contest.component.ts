import { Component, OnInit } from '@angular/core';
import { UrlConfiguration, match, contest, player, Team } from './../core/url-configuration';
import { UtilityService } from './../core/utility.service';
import { OpenContestService } from './open-contest.service';
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
  showbreakupmodal: boolean = false;
  constructor( private router: Router, private util : UtilityService, private service : OpenContestService ) { 
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
        if(contest.matchId == this.currentMatch.id && contest.type.charAt(0) == this.util.contestType){
          this.currentContests.push(contest);
        }
      }
    }
    console.log(this.currentContests);
  }

  openbreakupmodal(){
    this.showbreakupmodal = true;
  }

  closebreakupmodal() {
    //console.log(event);
    this.showbreakupmodal = false;
  }

  save(contest){
    this.service.getTeamsData(contest.matchId).subscribe(
      data => {
        console.log(data);
        this.util.participantTeams = data.data as Team[];
      },
      error => {
        console.log(error);
      });
  }

  join(contest){
    this.util.currentContests = contest;
    this.save(contest);
    this.router.navigateByUrl("/join");
  }

  showTeams(contest){
      this.util.currentContests = contest;
      console.log(this.util.currentContests);
      this.save(contest);
      this.router.navigateByUrl("/participants");
    }
}
