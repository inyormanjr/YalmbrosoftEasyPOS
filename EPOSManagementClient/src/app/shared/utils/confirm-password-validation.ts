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
}
