import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DashboardInfo } from 'src/app/models/dashboard.info';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  baseURL = environment.baseApiURL + 'dashboard';
  constructor(private httpClient: HttpClient) {}

  getDashboardInfo(): Observable<DashboardInfo> {
    return this.httpClient
      .get<DashboardInfo>(this.baseURL + '/info')
      .pipe(map((x: any) => x.data));
  }
}
