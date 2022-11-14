import { Variants, StockMovementType, Inventory } from './../../../models/item';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/login/services/auth.service';
import { Item } from 'src/app/models/item';
import { environment } from 'src/environments/environment';
import { SearchParams } from 'src/app/shared/_models/search.params';

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
      params = params.append('name', searchString);
    }
    return this.httpClient
      .get(this.baseURL, { params })
      .pipe(map((x: any) => x));
  }

  getManyInventory(searchString?: any): Observable<any> {
    let params = new HttpParams();
    if (searchString) {
      params = params.set('name', searchString);
    }
    return this.httpClient
      .get(this.baseURL + '/inventory', { params: params })
      .pipe(map((x: any) => x));
  }

  getManyProducts(searchParam?: SearchParams): Observable<any> {
    let params = new HttpParams();
    if (searchParam) {
      params = params.set(searchParam.key, searchParam.value);
    }
    return this.httpClient
      .get(this.baseURL + '/inventory/products', { params: params })
      .pipe(map((x: any) => x));
  }

  getStockMovement(page?: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('company', this.authService.companyId());
    return this.httpClient
      .get(this.baseURL + '/inventory/stockmovement', { params })
      .pipe(map((x: any) => x));
  }

  updateSingleVariant(variantId: string, variant: Variants): Observable<any> {
    return this.httpClient.put(
      this.baseURL + `/inventory/${variantId}`,
      variant
    );
  }

  stockMovement(
    variantId: string,
    stockMovementType: StockMovementType,
    quantity: number,
    inventory: Inventory,
    remarks?: string
  ): Observable<any> {
    return this.httpClient.put(this.baseURL + `/inventory/${variantId}`, {
      quantity,
      stockMovementType,
      inventory,
      remarks,
    });
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
