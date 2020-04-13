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

        this.getAllContestData();

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
    this.service.getContestData(ids).subscribe(
      (res) => {
        const contests = res.data as contest[];
        this.util.contests = contests;
      },
      (error) => {}
    );
  }

  getCurrentMatchContests(id) {
    let contests = this.util.contests;
    let temp: contest[] = [];
    if (contests && contests.length > 0) {
      for (let contest of contests) {
        if (contest.matchId == id) temp.push(contest);
      }
    }

    return temp;
  }

  saveData(match: match, contests: contest[]) {
    this.util.matches = this.matches;
    this.util.currentMatch = match;
  }

  onShowTeamsClick(matchId: any) {
    for (const match of this.matches) {
      if (match.id === matchId) {
        this.service.getContestData(match.id).subscribe(
          (data) => {
            console.log(data);
            const contests = data.data as contest[];
            this.saveData(match, contests);
            this.router.navigateByUrl('/showTeam');
          },
          (error) => {
            console.log(error);
          }
        );
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
              this.service.getContestData(match.id).subscribe(
                (data) => {
                  console.log(data);
                  const contests = data.data as contest[];
                  this.saveData(match, contests);
                  this.util.editTeam = false;
                  this.router.navigateByUrl('/createTeam');
                },
                (error) => {
                  console.log(error);
                }
              );
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
