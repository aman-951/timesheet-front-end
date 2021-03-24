import { Validators } from "@angular/forms";
import { FormBase } from "../schemas/form-base";

export const Role: FormBase[] = [{
    type: 'text',
    name: 'name',
    label: 'Name',
    placeholder: 'Name',
    validators: [Validators.required, Validators.maxLength(50)],
    maxlength: 50,
    icon: 'fa-bullseye'
}]
