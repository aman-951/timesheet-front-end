import { Validators } from "@angular/forms";
import { SelectOption } from "../schemas/select-option";

export const User = (roles: SelectOption[]) => [{
    type: 'text',
    name: 'name',
    label: 'Name',
    placeholder: 'name',
    validators: [Validators.required, Validators.maxLength(191)],
    maxlength: 191,
    icon: 'fa-user'
}, {
    type: 'text',
    name: 'username',
    label: 'Username',
    placeholder: 'username',
    validators: [Validators.required, Validators.maxLength(191)],
    maxlength: 191,
    icon: 'fa-user'
}, {
    type: 'text',
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    validators: [Validators.required, Validators.email, Validators.maxLength(191)],
    maxlength: 191,
    icon: 'fa-inbox'
}, {
    type: 'text',
    name: 'phone',
    label: 'Phone',
    placeholder: 'Phone',
    validators: [Validators.required, Validators.maxLength(10), Validators.pattern(/^[\d]{10}/)],
    maxlength: 10,
    icon: 'fa-phone',
    hint: 'phone must be a number of 10 digits. ex: 9876543210'
}, {
    type: 'select',
    name: 'role_id',
    label: 'Role',
    placeholder: 'Role',
    validators: [Validators.required],
    icon: 'fa-bullseye',
    options: roles
}]
