import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/login/services/auth.service';

import { Observable } from 'rxjs';
import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export default class Validation {

 static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return
      }

      if (control.value != matchingControl.value) {
        matchingControl.setErrors({MustMatch: true})
      }
      else {
        matchingControl.setErrors(null);
      }
    }
 }

  static mustNotEmptyString(controlNames: string[]) {
    return (formGroup: FormGroup) => {
      if (controlNames.length > 0) {
        controlNames.forEach(((x: any) => {
          const control = formGroup.controls[x];
          if (control.errors && !control.errors.Empty) {
            return
          }
          if (control.value.trim().length === 0) {
            control.setErrors({Empty: true});
          }
          else {
             control.setErrors(null);
          }
        }))
      }
    }
  }
}
