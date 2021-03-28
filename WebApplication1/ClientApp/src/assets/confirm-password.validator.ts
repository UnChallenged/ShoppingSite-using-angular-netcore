import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
  static MatchPassword(control: AbstractControl) {
    let password = control.get('uPassword').value;
    let confirmPassword = control.get('confirmpassFormControl').value;
    if (password != confirmPassword) {
      control.get('confirmpassFormControl').setErrors({ ConfirmPassword: true });
    }
    else {
      return null;
    }
  }
}
