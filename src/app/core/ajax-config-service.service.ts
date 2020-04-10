import { Injectable } from '@angular/core';
import { UrlConfiguration } from './url-configuration';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AjaxConfigService {

  baseUrl = environment.api;
  private urlConfig: UrlConfiguration =  {
    login: {
      endPointUrl: '',
      method: '',
      token: false
    }
  };

  protected getUrl( requestId: string): string {
    return this.baseUrl+ this.urlConfig[requestId].endPointUrl;
  }

  protected getMethod( requestId: string): string {
    return this.urlConfig[requestId].method;
  }

  protected getContentType( requestId: string): string {
    return 'application/json';
  }

  protected getHeader( requestId: string): any {
    let headers;
    headers = new HttpHeaders().set('Content-Type', this.getContentType(requestId));
    return headers;
  }
}
