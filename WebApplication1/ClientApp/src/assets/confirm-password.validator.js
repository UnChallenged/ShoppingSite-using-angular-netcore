"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfirmPasswordValidator = /** @class */ (function () {
    function ConfirmPasswordValidator() {
    }
    ConfirmPasswordValidator.MatchPassword = function (control) {
        var password = control.get('uPassword').value;
        var confirmPassword = control.get('confirmpassFormControl').value;
        if (password != confirmPassword) {
            control.get('confirmpassFormControl').setErrors({ ConfirmPassword: true });
        }
        else {
            return null;
        }
    };
    return ConfirmPasswordValidator;
}());
exports.ConfirmPasswordValidator = ConfirmPasswordValidator;
//# sourceMappingURL=confirm-password.validator.js.map