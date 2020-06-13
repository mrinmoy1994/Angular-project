import { Injectable } from '@angular/core';
import {
  CanActivate,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {
    constructor(private router: Router)
    {}
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
      if (localStorage.getItem('token') !== null){
        return true;
      }
      else{
        return this.router.parseUrl('/login');
      }
    }
  }
