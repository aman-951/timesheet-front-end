import { Validators } from "@angular/forms";
import { FormBase } from "../schemas/form-base";

export const ResetPassword: FormBase[] = [{
    type: 'password',
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    validators: [Validators.required, Validators.maxLength(50)],
    icon: 'fa-key'
}]
