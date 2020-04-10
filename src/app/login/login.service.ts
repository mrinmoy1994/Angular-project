import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient) { }

  getLoginToken(data):Observable<any> {
    return this.http.post('https://dev.captainxcc.com/capx/rest/login/native/do',data);
  }
} 
 