import { AuthService } from './../../../login/services/auth.service';
import { Supplier } from 'src/app/models/supplier';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  baseURL = environment.baseApiURL + 'suppliers';
  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  getMany(companyId?: string): Observable<any> {
    let params = new HttpParams();
      params = params.set('company', this.authService.companyId());

    return this.httpClient.get(this.baseURL, {params}).pipe(map((x: any) => x));
  }

  getById(id: string): Observable<any> {
    return this.httpClient
      .get(this.baseURL + `/${id}`)
      .pipe(map((x: any) => x));
  }

  create(supplier: Supplier): Observable<any> {
    return this.httpClient
      .post(this.baseURL,  supplier )
      .pipe(map((x: any) => x));
  }

  update(id: string, supplier: Supplier): Observable<any> {
    return this.httpClient
      .put(this.baseURL + `/${id}`,  supplier )
      .pipe(map((x: any) => x));
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(this.baseURL + `/${id}`).pipe(map((x: any) => x));
  }
}
