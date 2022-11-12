import { map } from 'rxjs/operators';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/login/services/auth.service';


export function companyNameValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return authService.checkExistCompany(control.value).pipe(
      map(x => {
        return x ? null : { notavailable: true };
      })
    )
  }
}

export function userNameValidator(
  authService: AuthService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return authService.checkExistCompany(control.value).pipe(
      map((x) => {
        return x ? null : { notavailable: true };
      })
    );
  };
}
