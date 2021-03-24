import { Validators } from "@angular/forms";
import { FormBase } from "../schemas/form-base";

export const ForgotPassword: FormBase[] = [{
    type: 'text',
    name: 'username',
    label: 'Username',
    placeholder: 'Username/Email/Phone',
    validators: [Validators.required, Validators.maxLength(191)],
    icon: 'fa-user'
}]
