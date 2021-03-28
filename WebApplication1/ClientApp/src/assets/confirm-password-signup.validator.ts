import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidatorSignup {
  static MatchPassword(control: AbstractControl) {
    let password = control.get('UPassword').value;
    let confirmPassword = control.get('confirmpassFormControl').value;
    if (password != confirmPassword) {
      control.get('confirmpassFormControl').setErrors({ ConfirmPassword: true });
    }
    else {
      return null;
    }
  }
}
