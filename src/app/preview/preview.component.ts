import { Component, OnInit } from '@angular/core';
import { UtilityService } from './../core/utility.service';
import { UrlConfiguration, match, contest, player } from './../core/url-configuration';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  team : player[] = [];
  wk : player[] = [];
  ar : player[] = [];
  bat : player[] = [];
  ball : player[] = [];

  constructor(private util : UtilityService, private router : Router) {
    
   }

  ngOnInit(): void {

    if(!this.util.currentTeam)
    this.router.navigateByUrl('/home');
    this.team = this.util.currentTeam;

    console.log("in init");
    
    for(let player of this.team)
    {
      console.log(player)
      if(player.playerRole == 'WICKETKEEPER')
        this.wk.push(player);
      if(player.playerRole == 'BOWLER')
        this.ball.push(player);
      if(player.playerRole == 'BATSMAN')
        this.bat.push(player);
      if(player.playerRole == 'ALLROUNDER')
        this.ar.push(player);
    }

  }

  back(){
    this.router.navigateByUrl(this.util.backPage);
  }

}
