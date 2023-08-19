import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userInfo = localStorage.getItem('user-info') ? JSON.parse(localStorage.getItem('user-info') || '{}') : {};
    if (!userInfo || !userInfo.token || new Date() > new Date(userInfo.expiry)) {
    this.route.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
