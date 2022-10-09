import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

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
}
