import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AppService {

  constructor(private httpclient: HttpClient) {
  }

  getData(): Observable<any> {
    return this.httpclient.get('https://api.github.com/users/octocat/orgs');
  }

}
