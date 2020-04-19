import { Component, OnInit } from '@angular/core';
import { UrlConfiguration, match, contest, player } from './../core/url-configuration';
import { UtilityService } from './../core/utility.service';
import { CreateteamService } from './../create-team/createteam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  text:any = {
    Days: "",
    Hours: "",
    Minutes: "",
    Seconds: ""
  };
  currentMatch: match;
  currentContests : contest;
  showbreakupmodal: boolean = false;
  constructor( private router: Router, private util : UtilityService, private service : CreateteamService ) { 
  }

  ngOnInit(): void {
    if(!this.util.currentMatch){
      this.router.navigateByUrl("/home");
    }
    this.currentMatch = this.util.currentMatch; 
    
    console.log("currentContests");
    this.currentContests = this.util.currentContests;
    console.log(this.currentContests);
  }

  openbreakupmodal(){
    this.showbreakupmodal = true;
  }

  closebreakupmodal() {
    //console.log(event);
    this.showbreakupmodal = false;
  }

  join(contest){
    this.util.currentContests = contest;
    this.router.navigateByUrl("/join");
  }

  showTeams(contest){
      this.util.currentContests = contest;
      this.router.navigateByUrl("/participants");
    }

}
