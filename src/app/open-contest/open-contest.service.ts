import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenContestService {

  constructor(private http: HttpClient) { }

  getTeamsData(id: string | number):Observable<any> {
    let token ='Bearer ' + localStorage.getItem("token");
    if(token){
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.append('Authorization', token);
      return this.http.get('https://dev.captainxcc.com/capx/rest/contest/'+id+'/user/team/do', { headers: headers});
    }
  }
}
