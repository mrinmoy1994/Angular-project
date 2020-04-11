import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChooseCaptainService {
  constructor(private http: HttpClient) { }

  createTeam(data: any):Observable<any> {
    let token ='Bearer ' + localStorage.getItem("token");
    if(token){
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.append('Authorization', token);
      return this.http.post('https://dev.captainxcc.com/capx/rest/user/team/create/do',data, { headers: headers});
    }
  }

  updateTeam(data: any, id):Observable<any> {
    let token ='Bearer ' + localStorage.getItem("token");
    if(token){
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.append('Authorization', token);
      return this.http.post('https://dev.captainxcc.com/capx/rest/user/team/edit/do',data, { headers: headers});
    }
  }
}
