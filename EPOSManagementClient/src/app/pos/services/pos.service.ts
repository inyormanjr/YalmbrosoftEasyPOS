import { CashInOut } from './../../models/cashinout';
import { PosConfig } from './../../models/pos.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PosTransaction } from './../../models/pos-transaction';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/login/services/auth.service';
import { BaseService } from 'src/app/shared/base/service/base.service';
import { CashOutCategory } from 'src/app/models/cashoutcategory';

@Injectable({
  providedIn: 'root',
})
export class PosService extends BaseService<PosTransaction> {
  serviceRoute = 'pos';
  constructor(public httpClient: HttpClient, public authService: AuthService) {
    super(httpClient, authService);
    this.baseURL += this.serviceRoute;
  }

  getCurrentTransactions(): Observable<PosTransaction[]> {
    return this.httpClient
      .get(this.baseURL + '/transactions')
      .pipe(map((x: any) => x.data));
  }

  getPosConfig(): Observable<PosConfig> {
    return this.httpClient
      .get<PosConfig>(this.baseURL + '/config')
      .pipe(map((x: any) => x.data));
  }

  updatePosConfig(id: any, config: any): Observable<any> {
    return this.httpClient
      .put(this.baseURL + '/config/' + id, config)
      .pipe(map((x: any) => x.data));
  }

  getCashOutCategories(): Observable<CashOutCategory[]> {
    return this.httpClient
      .get<CashOutCategory[]>(this.baseURL + '/config/cashoutcategory')
      .pipe(map((x: any) => x.data));
  }

  createCashOutCategory(obj: any): Observable<any> {
    return this.httpClient
      .post(this.baseURL + '/config/cashoutcategory', obj)
      .pipe(map((x: any) => x.data));
  }

  updateCashOutCategory(id: string, obj: any): Observable<any> {
    return this.httpClient
      .put(this.baseURL + '/config/cashoutcategory/' + id, obj)
      .pipe(map((x: any) => x.data));
  }

  getCashInOuts(): Observable<CashInOut[]> {
    return this.httpClient
      .get<CashInOut[]>(this.baseURL + '/config/cashinout')
      .pipe(map((x: any) => x.data));
  }

  createCashInOut(obj: any): Observable<any> {
    return this.httpClient
      .post(this.baseURL + '/config/cashinout', obj)
      .pipe(map((x: any) => x.data));
  }
}
