import { Component, OnInit } from '@angular/core';
import { UrlConfiguration, match, contest, player } from './../core/url-configuration';
import { UtilityService } from './../core/utility.service';
import { CreateteamService } from './createteam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss','./../home/home.component.scss']
})
export class CreateTeamComponent implements OnInit {
  text:any = {
    Days: "",
    Hours: "",
    Minutes: "",
    Seconds: ""
  };
  tempTeam : player[];
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
  constructor( private router: Router, private util : UtilityService, private service : CreateteamService ) { 
    this.util.isHeaderFooterNeeded.next(true);
  }

  ngOnInit(): void {
    if(!this.util.currentMatch){
      this.router.navigateByUrl("/home");
    }
    this.currentMatch = this.util.currentMatch;

    if(this.util.credit && this.util.credit != 0)
      this.credit = this.util.credit;
    if(this.util.currentTeam && this.util.currentTeam !=null)
      this.tempTeam = this.util.currentTeam;
    if(this.util.team1PlayerCount && this.util.team1PlayerCount != 0)
      this.team1Player = this.util.team1PlayerCount;
    if(this.util.team2PlayerCount && this.util.team2PlayerCount != 0)
      this.team2Player = this.util.team2PlayerCount;
    
    this.service.getPlayersData(this.currentMatch.id).subscribe(
      data => {
        this.players = data.data as player[];
          for(let p of this.players){
            if(this.tempTeam){
              for(let p1 of this.tempTeam){
                if(p.name == p1.name){
                  p.selected = true;
                  this.team.push(p);
                }
              }
            }
          }

          if(this.team)
          {
            for(let player of this.team){
              console.log(player);
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

        this.getWicketKeepers();
      },
      error => {
        console.log(error);
      });
      
  }

  getWicketKeepers(){
    this.instruction = 'Pick 1-2 Wicket Keeper';
    this.playerList = [];
    for(let player of this.players){
      if(player.playerRole == 'WICKETKEEPER')
        this.playerList.push(player);
      console.log(player.selected);
    }
  }

  getBowlers(){
    this.instruction = 'Pick 2-5 Bowlers';
    this.playerList = [];
    for(let player of this.players){
      if(player.playerRole == 'BOWLER')
        this.playerList.push(player);
    }
  }

  getBatsmen(){
    this.instruction = 'Pick 2-5 Batsmen';
    this.playerList = [];
    for(let player of this.players){
      if(player.playerRole == 'BATSMAN')
        this.playerList.push(player);
    }
  }

  getAllrounders(){
    this.instruction = 'Pick 2-4 AllRounder';
    this.playerList = [];
    for(let player of this.players){
      if(player.playerRole == 'ALLROUNDER')
        this.playerList.push(player);
    }
}

  addPlayers(id: number){
    if(this.team.length>=11){
      window.alert("You have added 11 players in the team already.");
      return;
    }

    for(let player of this.players){
      if(player.id == id){
        const index: number = this.team.indexOf(player);
        if (index !== -1) {
          window.alert("This player is already added in the team.");
          return;
        }

        if((player.price + this.credit)>100){
          window.alert("Remaining credit is lesser than required credit.");
          return;
        }

        if(this.currentMatch.clubMatch){
          if((player.club == this.currentMatch.team1 && this.team1Player<7) ||(player.club == this.currentMatch.team2 && this.team2Player<7)){
            if(player.playerRole == 'WICKETKEEPER' )
            {
              if(this.wk < 2){
                player.selected = true;
                this.team.push(player);
                this.wk ++;
                this.credit += player.price;
                if(player.club == this.currentMatch.team1) this.team1Player ++; else this.team2Player++;
              }
              else{
                window.alert("Can not select more than 2 wicket keeper.");
              }
            }

            if(player.playerRole == 'ALLROUNDER' )
            {
              if(this.ar < 4){
                player.selected = true;
                this.team.push(player);
                this.ar ++;
                this.credit += player.price;
                if(player.club == this.currentMatch.team1) this.team1Player ++; else this.team2Player++;
              }
              else{
                window.alert("Can not select more than 4 allrounders.");
              }
            }

            if(player.playerRole == 'BATSMAN' )
            {
              if(this.bat < 5){
                player.selected = true;
                this.team.push(player);
                this.bat ++;
                this.credit += player.price;
                if(player.club == this.currentMatch.team1) this.team1Player ++; else this.team2Player++;
              }
              else{
                window.alert("Can not select more than 5 batsmen.");
              }
            }

            if(player.playerRole == 'BOWLER' )
            {
              if(this.ball < 5){
                player.selected = true;
                this.team.push(player);
                this.ball ++;
                this.credit += player.price;
                if(player.club == this.currentMatch.team1) this.team1Player ++; else this.team2Player++;
              }
              else{
                window.alert("Can not select more than 5 bowlers.");
              }
            }
              
          }
          else{
            window.alert("Can not select more than 7 players from one side.");
          }
        }
        else{
          if((player.nationality == this.currentMatch.team1 && this.team1Player<7) ||(player.nationality == this.currentMatch.team2 && this.team2Player<7)){
            if(player.playerRole == 'WICKETKEEPER' )
            {
              if(this.wk < 2){
                player.selected = true;
                this.team.push(player);
                this.wk ++;
                this.credit += player.price;
                if(player.nationality == this.currentMatch.team1) this.team1Player ++; else this.team2Player++;
              }
              else{
                window.alert("Can not select more than 2 wicket keeper");
              }
            }
            if(player.playerRole == 'ALLROUNDER' )
            {
              if(this.ar < 4){
                player.selected = true;
                this.team.push(player);
                this.ar ++;
                this.credit += player.price;
                if(player.nationality == this.currentMatch.team1) this.team1Player ++; else this.team2Player++;
              }
              else{
                window.alert("Can not select more than 2 allrounders.");
              }
            }

            if(player.playerRole == 'BATSMAN' )
            {
              if(this.bat < 5){
                player.selected = true;
                this.team.push(player);
                this.bat ++;
                this.credit += player.price;
                if(player.nationality == this.currentMatch.team1) this.team1Player ++; else this.team2Player++;
              }
              else{
                window.alert("Can not select more than 5 batsmen.");
              }
            }

            if(player.playerRole == 'BOWLER' )
            {
              if(this.ball < 5){
                player.selected = true;
                this.team.push(player);
                this.ball ++;
                this.credit += player.price;
                if(player.nationality == this.currentMatch.team1) this.team1Player ++; else this.team2Player++;
              }
              else{
                window.alert("Can not select more than 5 bowlers.");
              }
            }
              
          }
          else{
            window.alert("Can not select more than 7 players from one side.");
          }
        }
      }
    }
  }

  removePlayers(id: number | player){
    console.log(id);
    for(let player of this.players){
      if(player.id == id){
        const index: number = this.team.indexOf(player);
        if (index !== -1) {
          console.log(id);
          player.selected = false;
          this.credit -= player.price;
          console.log(this.wk);
          if(player.playerRole == 'WICKETKEEPER')
            this.wk--;
          console.log(this.wk);
          if(player.playerRole == 'ALLROUNDER')
            this.ar--;
          if(player.playerRole == 'BATSMAN')
            this.bat--;
          if(player.playerRole == 'BOWLER')
            this.ball--;
          if(this.currentMatch.clubMatch){
            if(player.club == this.currentMatch.team1) this.team1Player --; else this.team2Player--;
          }
          else{
            if(player.nationality == this.currentMatch.team1) this.team1Player --; else this.team2Player--;
          }
          console.log(this.team.splice(index, 1));
        }
      }
    }
  }

  saveAndNext(){
    this.util.team1PlayerCount = this.team1Player;
    this.util.team2PlayerCount = this.team2Player;
    this.util.currentTeam = this.team;
    this.util.credit = this.credit;
    this.util.availPlayers = this.players;
  }

  next(){
    this.saveAndNext();
    if(this.team.length<11){
      window.alert("You need to have 11 players in the one team.");
      return;
    }

    if(this.wk<1){
      window.alert("You need to have atleast 1 wicketkeeper in the team.");
      return;
    }

    if(this.bat<2){
      window.alert("You need to have atleast 2 batsmen in the team.");
      return;
    }

    if(this.ball<2){
      window.alert("You need to have atleast 2 bowlers in the team.");
      return;
    }

    if(this.ar<2){
      window.alert("You need to have atleast 2 all-rounders in the team.");
      return;
    }
    this.router.navigateByUrl("/chooseCaptain");
  }

  preview(){
    this.util.currentTeam = this.team;
    this.saveAndNext();
    this.util.backPage = "/createTeam";
    this.router.navigateByUrl("/preview");
  }

}
