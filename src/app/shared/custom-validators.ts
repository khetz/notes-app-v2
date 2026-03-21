import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const equalPasswordFieldsValidator: ValidatorFn = (
    control: AbstractControl) : ValidationErrors | null => {
        const password = control.get('registerPassword');
        const confirmPassword = control.get('registerConfirmPassword');

        return password && confirmPassword 
            && password.value === confirmPassword.value
            ? null : { passwordMismatch: true };
    };