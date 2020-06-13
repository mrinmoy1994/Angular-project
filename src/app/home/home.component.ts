import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import {
  UrlConfiguration,
  match,
  contest,
  Team,
} from './../core/url-configuration';
import { UtilityService } from './../core/utility.service';
import { ShowTeamsService } from './../show-teams/show-teams.service';
import {
  ɵBROWSER_SANITIZATION_PROVIDERS,
  DomSanitizer,
  ɵDomSanitizerImpl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allcontests: contest[];
  matches: match[];
  count: number;
  img: any;
  text: any = {
    Days: '',
    Hours: '',
    Minutes: '',
    Seconds: '',
  };

  constructor(
    private router: Router,
    private service: HomeService,
    private sanitizer: DomSanitizer,
    private util: UtilityService,
    private teamService: ShowTeamsService
  ) {}

  ngOnInit() {
    this.service.getUpcomingMatchData().subscribe(
      (data) => {
        this.matches = data.data as match[];
        this.count = this.matches.length;

       // this.getAllContestData();

       let ids: number[] = [];
    for (let match of this.matches) {
      ids.push(match.id);
    }
    console.log(ids);
    this.service.getContestData(ids).subscribe(
      (res) => {
        console.log(res);
        const contests = res.data as contest[];
        console.log(contests);
        this.util.contests = contests;
        this.allcontests = contests;
        console.log(this.util.contests);
      

        for (const m of this.matches) {
          console.log(m.matchTime);
          const time = m.matchTime.split('T');
          const year = time[0].split('-');
          const hour = time[1].split(':');
          const gamedate = new Date(2020, 3, 15, 21, 0, 0, 0);
          m.matchTimeinSec =
            gamedate.getMonth() +
            1 +
            ' ' +
            gamedate.getDate() +
            ', ' +
            gamedate.getFullYear() +
            ', ' +
            time[1];
          console.log(m);

          const contests = this.getCurrentMatchContests(m.id);
          console.log(contests);
          m.totalLeagues = contests.length;
          let ammount = 0;
          for (const contest of contests) {
            ammount += contest.totalPrize;
          }
          m.totalMoney = ammount;
          this.service.getTeamImage(m.category, m.team1Id).subscribe(
            (data) => {
              const blob = new Blob([data], { type: 'image/png' });
              const url = window.URL.createObjectURL(blob);
              m.team1pic = this.sanitizer.bypassSecurityTrustUrl(url);
            },
            (error) => {
              console.log(error);
            }
          );

          this.service.getTeamImage(m.category, m.team2Id).subscribe(
            (data) => {
              const blob = new Blob([data], { type: 'image/png' });
              const url = window.URL.createObjectURL(blob);
              m.team2pic = this.sanitizer.bypassSecurityTrustUrl(url);
            },
            (error) => {
              console.log(error);
            }
          );
        }

      },
      (error) => {
        console.log(error);
      }
    );
      },
      (error) => {
        console.log(error);
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
          this.router.navigateByUrl('/login');
        }
      }
    );
  }

  getAllContestData() {
    let ids: number[] = [];
    for (let match of this.matches) {
      ids.push(match.id);
    }
    console.log(ids);
    this.service.getContestData(ids).subscribe(
      (res) => {
        console.log(res);
        const contests = res.data as contest[];
        console.log(contests);
        this.util.contests = contests;
        this.allcontests = contests;
        console.log(this.util.contests);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCurrentMatchContests(id) {
    if (!this.util.contests) 
      this.getAllContestData();
    //let contests = this.util.contests;
    let temp: contest[] = [];
    console.log(this.util.contests);
    if (this.util.contests && this.util.contests.length > 0) {
      for (let contest of this.util.contests) {
        if (contest.matchId == id) temp.push(contest);
      }
    }

    return temp;
  }

  saveData(match: match, contests: contest[]) {
    this.util.matches = this.matches;
    this.util.currentMatch = match;
  }

  selectContest(matchId: any) {
    for (const match of this.matches) {
      if (match.id === matchId) {
        const contests = this.getCurrentMatchContests(match.id);
        this.saveData(match, contests);
        this.router.navigateByUrl('/selectContest');
      }
    }
  }

  onShowTeamsClick(matchId: any) {
    for (const match of this.matches) {
      if (match.id === matchId) {
        const contests = this.getCurrentMatchContests(match.id);
        this.saveData(match, contests);
        this.router.navigateByUrl('/showTeam');
      }
    }
  }

  onCreateTeamClick(matchId: any) {
    this.util.editTeam = false;
    for (const match of this.matches) {
      if (match.id === matchId) {
        this.teamService.getTeamsData(match.id).subscribe(
          (data) => {
            let teams = data.data as Team[];
            if (teams.length < 5) {
              
              let contestData = this.getCurrentMatchContests(matchId);
                  console.log(contestData);
                  const contests = contestData;
                  this.saveData(match, contests);
                  this.util.editTeam = false;
                  this.router.navigateByUrl('/createTeam');
               
            } else {
              window.alert('You can not create more than 5 teams for a match.');
              return;
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }
}
