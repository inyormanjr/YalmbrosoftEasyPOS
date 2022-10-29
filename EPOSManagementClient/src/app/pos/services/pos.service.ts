import { PosTransaction } from './../../models/pos-transaction';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/login/services/auth.service';
import { BaseService } from 'src/app/shared/base/service/base.service';

@Injectable({
  providedIn: 'root',
})
export class PosService extends BaseService<PosTransaction> {
  serviceRoute = 'pos';
  constructor(public httpClient: HttpClient, public authService: AuthService) {
    super(httpClient, authService);
    this.baseURL += this.serviceRoute;
  }
}
