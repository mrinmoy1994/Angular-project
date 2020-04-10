import { Component, OnInit } from '@angular/core';
import { UrlConfiguration, match, contest, player } from './../core/url-configuration';
import { UtilityService } from './../core/utility.service';
import { ChooseCaptainService } from './choose-captain.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-choose-captain',
  templateUrl: './choose-captain.component.html',
  styleUrls: ['./choose-captain.component.scss']
})
export class ChooseCaptainComponent implements OnInit {
  currentMatch: match;
  players : player[];
  instruction : string;
  playerList : player[] = [];
  team : player[] = [];
  wk : number = 0;
  bat : number = 0;
  ball : number = 0;
  ar : number = 0;
  team1Player  : number = 0;
  team2Player : number = 0;
  credit : number = 0;
  captain : player =
  {
    age: 0,
    club: null,
    displayName: null,
    externalId: 0,
    height: 0,
    id: 0,
    name: null,
    nationality: null,
    playerRole: null,
    playerStatus: null,
    price: 0,
    point: 0,
    selected : false
  } ;

  text:any = {
    Days: "",
    Hours: "",
    Minutes: "",
    Seconds: ""
  }; 
  vicecaptain: player;
  constructor( private router: Router, private util : UtilityService, private service : ChooseCaptainService ) { 
  }

  ngOnInit(): void {
    if(!this.util.currentMatch){
      this.router.navigateByUrl("/createTeam");
    }
    
    this.currentMatch = this.util.currentMatch;

    if(this.util.credit && this.util.credit != 0)
      this.credit = this.util.credit;
    if(this.util.currentTeam && this.util.currentTeam !=null)
      this.team = this.util.currentTeam;
    if(this.util.team1PlayerCount && this.util.team1PlayerCount != 0)
      this.team1Player = this.util.team1PlayerCount;
    if(this.util.team2PlayerCount && this.util.team2PlayerCount != 0)
      this.team2Player = this.util.team2PlayerCount;

    if(this.util.captain && this.util.captain != null)
     {
      for(let player of this.team){
        if(player.name == this.util.captain. name)
          this.captain =player;
        } 
     }
      
        
    if(this.util.viceCaptain && this.util.viceCaptain != null)
    {
      for(let player of this.team){
        if(player.name == this.util.viceCaptain. name)
          this.vicecaptain =player;
        } 
     }
    
    for(let player of this.team){
      if(player.playerRole == 'WICKETKEEPER')
        this.wk++;
      if(player.playerRole == 'BOWLER')
        this.ball++;
      if(player.playerRole == 'BATSMAN')
        this.bat++;
      if(player.playerRole == 'ALLROUNDER')
        this.ar++;
    }
  }

  saveAndNext(){

    if(!this.captain || this.captain==null){
      window.alert("Please select one captain");
      return;
    }

    if(!this.vicecaptain || this.vicecaptain==null){
      window.alert("Please select one vicecaptain");
      return;
    }
    let ids :any[]=[];
    for(let player of this.team){
      ids.push(player.id);
    }

    let data : any;
    data = { 
      matchId : this.currentMatch.id, 
      userName : localStorage.getItem("userName"), 
      playerIds : ids, 
      captainId : this.captain.id, 
      viceCaptainId : this.vicecaptain.id
   };

   this.util.team1PlayerCount = 0;
    this.util.team2PlayerCount = 0;
    this.util.currentTeam = null;
    this.util.credit = 0;
    this.util.availPlayers = null;
    let id = this.util.editableTeamId;
    this.util.editableTeamId = 0;

    if(this.util.editTeam){
      console.log(this.util.editTeam);
      this.util.editTeam = false;
      this.service.updateTeam(data,id).subscribe(
        error => {
          console.log(error)
        });
    }
    else{
      this.service.createTeam(data).subscribe(
        error => {
          console.log(error)
        });
    
    }
   
   this.router.navigateByUrl("/showTeam");
  }

  setCaptain(player){
    if(this.vicecaptain == player)
      this.vicecaptain = null;
    this.captain = player;
  }

  setViceCaptain(player){
    if(this.captain == player)
      this.captain = null;
    this.vicecaptain = player;
  }

  back(){
    this.router.navigateByUrl("/createTeam");
  }

}
