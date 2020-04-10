import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { match, contest, player } from './url-configuration';

@Injectable({
  providedIn: "root"
})

export class UtilityService {
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _matches : match[];
    private _currentMatch : match;
    private _contests : contest[];
    private _currentTeam : player[];
    private _credit : number;
    private _team1PlayerCount : number;
    private _team2PlayerCount : number;
    private _availPlayers : player[];


    public get availPlayers() {
      return this._availPlayers;
    }
    public set availPlayers(team) {
      this._availPlayers = team;
    }

    public get team1PlayerCount() {
      return this._team1PlayerCount;
    }
    public set team1PlayerCount(count) {
      this._team1PlayerCount = count;
    }

    public get team2PlayerCount() {
      return this._team2PlayerCount;
    }
    public set team2PlayerCount(count) {
      this._team2PlayerCount = count;
    }

    public get credit() {
      return this._credit;
    }
    public set credit(credit) {
      this._credit = credit;
    }
    public get currentTeam() {
      return this._currentTeam;
    }
    public set currentTeam(team) {
      this._currentTeam = team;
    }
    public get matches() {
      return this._matches;
    }
    public set matches(matchLists) {
      this._matches = matchLists;
    }
    public get currentMatch() {
      return this._currentMatch;
    }
    public set currentMatch(match: match) {
      this._currentMatch = match;
    }
    public get contests() {
      return this._contests;
    }
    public set contests(contestList) {
      this._contests = contestList;
    }

    alertMsg (title: string, message: string, type: string) {}
}