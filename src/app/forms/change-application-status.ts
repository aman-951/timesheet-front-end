import { Validators } from "@angular/forms";
import { FormBase } from "../schemas/form-base";
import { SelectOption } from "../schemas/select-option";

export const ChangeApplicationStatus = (statuses: SelectOption[]): FormBase[] => [{
    type: 'select',
    name: 'status_id',
    label: 'Status',
    placeholder: 'Status',
    validators: [Validators.required, Validators.maxLength(50)],
    icon: 'fa-bullseye',
    options: statuses
}]
