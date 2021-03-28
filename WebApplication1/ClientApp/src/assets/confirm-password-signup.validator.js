"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfirmPasswordValidatorSignup = /** @class */ (function () {
    function ConfirmPasswordValidatorSignup() {
    }
    ConfirmPasswordValidatorSignup.MatchPassword = function (control) {
        var password = control.get('UPassword').value;
        var confirmPassword = control.get('confirmpassFormControl').value;
        if (password != confirmPassword) {
            control.get('confirmpassFormControl').setErrors({ ConfirmPassword: true });
        }
        else {
            return null;
        }
    };
    return ConfirmPasswordValidatorSignup;
}());
exports.ConfirmPasswordValidatorSignup = ConfirmPasswordValidatorSignup;
//# sourceMappingURL=confirm-password-signup.validator.js.map