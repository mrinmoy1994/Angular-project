import { Component, OnInit } from '@angular/core';
import {
  UrlConfiguration,
  match,
  contest,
  player,
} from './../core/url-configuration';
import { UtilityService } from './../core/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-contest',
  templateUrl: './select-contest.component.html',
  styleUrls: ['./select-contest.component.scss'],
})
export class SelectContestComponent implements OnInit {
  text: any = {
    Days: '',
    Hours: '',
    Minutes: '',
    Seconds: '',
  };
  currentMatch: match;
  contests: contest[];
  currentContests: contest[] = [];
  map: Map<any, any>;
  constructor(
    private router: Router,
    private util: UtilityService
  ) {
    this.util.isHeaderFooterNeeded.next(true);
  }

  ngOnInit(): void {
    if (!this.util.currentMatch) {
      this.router.navigateByUrl('/home');
    }
    this.currentMatch = this.util.currentMatch;
    this.contests = this.util.contests;

    if (this.contests) {
      for (let contest of this.contests) {
        if (contest.matchId == this.currentMatch.id) {
          this.currentContests.push(contest);
        }
      }
    }

    this.map = new Map();
    for (let contest of this.currentContests) {
      if (this.map.has(contest.type.charAt(0))) {
        let count = this.map.get(contest.type.charAt(0));
        count++;
        this.map.set(contest.type.charAt(0), count);
      } else {
        this.map.set(contest.type.charAt(0), 1);
      }
    }

    console.log(this.map);
  }

  onContestClick(type){

    this.util.contestType = type;
    this.router.navigateByUrl('/openContest');
  
  }
}


