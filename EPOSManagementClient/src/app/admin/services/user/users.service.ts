import { AuthService } from 'src/app/login/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './../../../shared/base/service/base.service';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<User> {
   serviceRoute = 'users';
  constructor(public httpClient: HttpClient, public authService: AuthService) {
    super(httpClient, authService);
    this.baseURL += this.serviceRoute;
  }
}
