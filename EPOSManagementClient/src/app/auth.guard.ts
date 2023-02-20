import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/login/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const authKey = localStorage.getItem('token');
    if (authKey) {
      const userRole = localStorage.getItem('role');

      if (route.data.roles && route.data.roles.indexOf(userRole) === -1) {
        this.router.navigate(['pos']);
        return false;
      }
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
