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
  
  currentMatch: match = null;
  teams : any[] = [];
  constructor( private router: Router, private util : UtilityService, private service : ShowTeamsService) { 
    console.log('Called Constructor');
    if(!this.util.currentMatch){
      this.router.navigateByUrl("/home");
    }
    this.currentMatch = this.util.currentMatch;
    this.service.getTeamsData(this.currentMatch.id).subscribe(
      data => {
        console.log('coming here');
        this.teams = data.data as Team[];
        console.log(this.teams);
      },
      error => {
        console.log(error);
      }); 
  }
  ngOnInit(): void {
    console.log('Called ngOnInit');
    if(!this.util.currentMatch){
      this.router.navigateByUrl("/home");
    }
    this.currentMatch = this.util.currentMatch;
    this.service.getTeamsData(this.currentMatch.id).subscribe(
      data => {
        console.log('coming here');
        this.teams = data.data as Team[];
        console.log(this.teams);
      },
      error => {
        console.log(error);
      }); 
  }

  saveTeamData(teamId){
    let team1Count : number =0;
    let team2Count : number =0;
    let credit : number =0;
    for(let team of this.teams){
      if(team.id == teamId){          
        for(let player of team.players){
          if(player.nationality == this.currentMatch.team1 || player.club == this.currentMatch.team1)
          {
            team1Count++;
          }
          else
            team2Count++;
          
          credit += player.price;
        }

        this.util.team1PlayerCount = team1Count;
        this.util.team2PlayerCount = team2Count;
        this.util.currentTeam = team.players;
        this.util.credit = credit;
        this.util.captain = team.captain;
        this.util.viceCaptain = team.viceCaptain;
        this.util.editableTeamId = team.id;
      }
    }
  }

  createNewTeam(){
        if(this.teams.length<5)
        {
          this.util.editTeam = false;
          this.router.navigateByUrl("/createTeam");
        }
        else{
          window.alert("You can not create more than 5 teams for a match.");
          return;
        }
  }

  copyExistingTeam(teamId){
    if(this.teams.length<5)
    {
      this.util.editTeam = false; 
      this.saveTeamData(teamId);
      this.router.navigateByUrl("/createTeam");   
    }
    else{
      window.alert("You can not create more than 5 teams for a match.");
      return;
    }
  }

  editExistingTeam(teamId){
    this.util.editTeam = true;
    this.saveTeamData(teamId);
    this.router.navigateByUrl("/createTeam");
  }

  preview(teamId){
    for(let team of this.teams){
      if(team.id == teamId){
        this.util.currentTeam = team.players;
        this.util.backPage = '/showTeam';
        this.router.navigateByUrl("/preview");
      }
    }
  }

}
