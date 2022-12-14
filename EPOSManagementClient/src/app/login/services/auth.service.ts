import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = environment.baseApiURL + 'auth';
  constructor(private httpClient: HttpClient) { }

  register(newUser : User): Observable<any> {
    return this.httpClient.post(this.baseURL + '/register', newUser).pipe(map((x: any) => x));
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(this.baseURL + '/login', { username, password }).pipe(map((x: any) => x));
  }

  changePassword(changePassObj: any): Observable<any> {
    return this.httpClient
      .put(this.baseURL + '/changePassword', changePassObj)
      .pipe(map((x: any) => x.data));;
  }

  confirmation(token: String): Observable<any> {
    return this.httpClient.put(this.baseURL + '/confirmation/'+ token, {}).pipe(map((x: any) => x));
  }

  checkExistCompany(companyName: string): Observable<any> {
    return this.httpClient
      .get(this.baseURL + '/companyCheck/' + companyName)
      .pipe(map((x: any) => x.data));
  }

  companyId() {
    let token = localStorage.getItem('token');
    if (token) {
      let decode: any = jwt_decode(token);

   return decode.company._id;
    }
    else {
      return null;
    }
  }
}
