import { Validators } from "@angular/forms";
import { FormBase } from "../schemas/form-base";

export const Status: FormBase[] = [{
    type: 'text',
    name: 'name',
    label: 'Name',
    placeholder: 'Name',
    validators: [Validators.required, Validators.maxLength(50)],
    maxlength: 50,
    icon: 'fa-vcard'
}, {
    type: 'text',
    name: 'description',
    label: 'Description',
    placeholder: 'Description',
    validators: [Validators.required, Validators.maxLength(255)],
    maxlength: 255,
    icon: 'fa-commenting'
}]
