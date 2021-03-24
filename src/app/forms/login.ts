import { Validators } from "@angular/forms";
import { FormBase } from "../schemas/form-base";

export const Login: FormBase[] = [{
    type: 'text',
    name: 'username',
    label: 'username',
    placeholder: 'Username/Email/Phone',
    validators: [Validators.required, Validators.maxLength(191)],
    maxlength: 191,
    icon: 'fa-user'
}, {
    type: 'password',
    name: 'password',
    label: 'password',
    placeholder: 'Password',
    validators: [Validators.required, Validators.maxLength(191)],
    maxlength: 191,
    icon: 'fa-key'
}]
