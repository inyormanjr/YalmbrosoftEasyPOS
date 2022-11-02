import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors;
              } else {
                console.log(error.statusText);
              }
              break;

            case 401:
              console.log(error.statusText);
              this.router.navigateByUrl('/login');
              break;

            case 404:
              //navigate byurl
              console.log(404);
              break;

            case 500:
              const navigationExtras: NavigationExtras = {
                state: { error: error.error },
              };
              //this.router.navigateByUrl('/server-error', navigationExtras);
              console.log(error.error);
              break;

            default:
              console.log('Something went wrong');
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
