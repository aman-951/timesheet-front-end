import { Validators } from "@angular/forms";
import { FormBase } from "../schemas/form-base";

export const Candidate: FormBase[] = [{
    type: 'group',
    label: 'name',
    groups: [{
        type: 'text',
        name: 'first_name',
        placeholder: 'First name',
        validators: [Validators.required, Validators.maxLength(50)],
        maxlength: 50,
        icon: 'fa-user'
    }, {
        type: 'text',
        name: 'middle_name',
        placeholder: 'Middle name',
        validators: [Validators.maxLength(50)],
        maxlength: 50,
        icon: 'fa-user'
    }, {
        type: 'text',
        name: 'last_name',
        placeholder: 'Last name',
        validators: [Validators.required, Validators.maxLength(50)],
        maxlength: 50,
        icon: 'fa-user'
    }]
}, {
    type: 'text',
    name: 'father_name',
    label: 'Father Name',
    placeholder: 'Father name',
    validators: [Validators.required, Validators.maxLength(191)],
    maxlength: 191,
    icon: 'fa-user'
}, {
    type: 'text',
    name: 'address',
    label: 'Address',
    placeholder: 'Address',
    validators: [Validators.required, Validators.maxLength(255)],
    maxlength: 255,
    icon: 'fa-location-arrow'
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
    type: 'file',
    name: 'resume',
    label: 'Resume',
    hint: 'upload file upto 2 mb. allow extensions are only doc and PDF'
}]
