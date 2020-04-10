import { Injectable } from '@angular/core';
import { AjaxConfigService } from './ajax-config-service.service';
import { Observable, throwError as observableThrowError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UtilityService } from './utility.service';
import { timeoutWith, catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AjaxService extends  AjaxConfigService{

  private userId: any;
  constructor(private http: HttpClient, private utilityService: UtilityService) {
    super();
  }

  setUserId(id) {
    this.userId = id;
  }
  getUserId() {
    return this.userId;
  }

  doHttpRequest(requestId: string, data: any): Observable<any> {

    let url = super.getUrl(requestId);
    const method = super.getMethod(requestId);

    if(method === 'POST') {
      data = JSON.stringify(data);
    }

    const request = {
      headers: super.getHeader(requestId),
      body: null,
      observe: 'body' as null,
      params: null
    }

    return this.http.request(method,url,request).pipe(
      timeoutWith(300000, observableThrowError (new Error ('HTTP Timeout exceeds'))),
      map((response: any) => this.handleSuccess(response,requestId)),
      catchError((error : HttpErrorResponse) => this.handleError(error))
    );

  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    // this.utilityService.loadSpinner(false);
    // this.requestInProgress = 0;
    // set the error if session is expired
    if (error.status === 200 &&
      error.error.text &&
      error.error.text.indexOf('<title>Login</title>') > -1) {
        // this.utilityService.alertMsg('Error', ValidationService.getValidatorErrorMessage('sessionExpiredErrorMsg'), 'redirection');
    } else {
      // this.utilityService.alertMsg('Error', ValidationService.getValidatorErrorMessage('apiFailureErroMsg'), 'failure');
    }

    return of(error);

}

private handleSuccess(data: Response, requestId: string): Observable<any> {
    // if (this.requestInProgress > 0) {
    //     this.requestInProgress--;
    // }
    let jsonResponse = null;
    try {
        jsonResponse = data.json();
    } catch (e) {
        jsonResponse = data;
    }

    // if (this.requestInProgress === 0) {
    //     this.utilityService.loadSpinner(false);
    // }
    let response = null;

    response = jsonResponse;
    return response;
}

}
