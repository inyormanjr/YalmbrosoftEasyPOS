import { IBaseService } from './iBase.Service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/login/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class BaseService<T> implements IBaseService<T> {
  baseURL = environment.baseApiURL;
  constructor(
    public httpClient: HttpClient,
    public authService: AuthService
  ) {}
  Get(): Observable<T[]> {
     let params = new HttpParams();
     params = params.set('companyId', this.authService.companyId());

    return this.httpClient.get<T[]>(this.baseURL, { params }).pipe(
      map((response: T[]) => {
        return response;
      })
    );
  }
  GetById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.baseURL +'/' +id).pipe(
      map((response: T) => {
        return response;
      })
    );
  }
  Create(t: T): Observable<T> {
    return this.httpClient
      .post<T>(this.baseURL, t)
      .pipe(map((response: T) => response));
  }
  Update(id: number, t: T): Observable<any> {
    return this.httpClient
      .put<T>(this.baseURL + '/' + id, t)
      .pipe(map((response: T) => response));
  }
  Delete(id: number): Observable<any> {
    return this.httpClient
      .delete(this.baseURL + '/' + id)
      .pipe(map((response: any) => response));
  }
}
