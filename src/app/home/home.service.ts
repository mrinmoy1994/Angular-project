import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getliveMatchData():Observable<any> {
    let token ='Bearer ' + localStorage.getItem("token");
    if(token){
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.append('Authorization', token);
      return this.http.get('https://dev.captainxcc.com/capx/rest/match/search/do?status=LIVE', { headers: headers});
    }
  }

  getUpcomingMatchData():Observable<any> {
    let token ='Bearer ' + localStorage.getItem("token");
    if(token){
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.append('Authorization', token);

      //console.log(headers.getAll('Authorization'));
      //return this.http.get('https://dev.captainxcc.com/capx/rest/match/search/do?status=LIVE', { headers: headers, responseType : 'blob'});
      return this.http.get('https://dev.captainxcc.com/capx/rest/match/search/do', { headers: headers});
    }
  }

  getTeamImage(type: string,teamId: string | number):Observable<Blob> {
    console.log(localStorage.getItem("token"));
    let token ='Bearer ' + localStorage.getItem("token");
    if(token){
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', token);
      return this.http.get('https://dev.captainxcc.com/capx/rest/user/document/'+type+'/'+teamId+'/do', { headers: headers, responseType: 'blob'});
    }
  }

  getContestData(matchId: any):Observable<any> {
    let token ='Bearer ' + localStorage.getItem("token");
    if(token){
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', token);
      let ids: any[] = [];
      ids.push(matchId);
      return this.http.post('https://dev.captainxcc.com/capx/rest/contest/search/matchids/do', ids, { headers: headers});
    }
  }
}
