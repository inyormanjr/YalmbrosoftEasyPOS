import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/login/services/auth.service';
import { Category } from 'src/app/models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseURL = environment.baseApiURL + 'categories';
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getMany(): Observable<any> {
    let params = new HttpParams();
    params = params.set('company', this.authService.companyId());

    return this.httpClient
      .get(this.baseURL, { params })
      .pipe(map((x: any) => x));
  }

  getById(id: string): Observable<any> {
    return this.httpClient
      .get(this.baseURL + `/${id}`)
      .pipe(map((x: any) => x));
  }

  create(supplier: Category): Observable<any> {
    return this.httpClient
      .post(this.baseURL, supplier)
      .pipe(map((x: any) => x));
  }

  update(id: string, supplier: Category): Observable<any> {
    return this.httpClient
      .put(this.baseURL + `/${id}`, supplier)
      .pipe(map((x: any) => x));
  }

  delete(id: string): Observable<any> {
    return this.httpClient
      .delete(this.baseURL + `/${id}`)
      .pipe(map((x: any) => x));
  }
}
