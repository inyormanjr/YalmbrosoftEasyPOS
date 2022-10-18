import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/login/services/auth.service';
import { Item } from 'src/app/models/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  baseURL = environment.baseApiURL + 'items';
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getMany(searchString?: string): Observable<any> {
    let params = new HttpParams();
    params = params.set('company', this.authService.companyId());

    if (searchString) {
      const test = JSON.stringify({ $regex: searchString });
      params = params.append('name', test);
    }
    return this.httpClient
      .get(this.baseURL, { params })
      .pipe(map((x: any) => x));
  }

  getManyInventory(searchString?: string): Observable<any> {
    let params = new HttpParams();
      if (searchString) {
        const test = JSON.stringify({ $regex: searchString });
        params = params.append('name', test);
      }
      return this.httpClient
        .get(this.baseURL + '/inventory', { params })
        .pipe(map((x: any) => x));
  }

  getById(id: string): Observable<any> {
    return this.httpClient
      .get(this.baseURL + `/${id}`)
      .pipe(map((x: any) => x));
  }

  create(item: Item): Observable<any> {
    return this.httpClient.post(this.baseURL, item).pipe(map((x: any) => x));
  }

  update(id: string, item: Item): Observable<any> {
    return this.httpClient
      .put(this.baseURL + `/${id}`, item)
      .pipe(map((x: any) => x));
  }

  delete(id: string): Observable<any> {
    return this.httpClient
      .delete(this.baseURL + `/${id}`)
      .pipe(map((x: any) => x));
  }
}
