import { Validators } from "@angular/forms";
import { SelectOption } from "../schemas/select-option";

export const ChangeUserRole = (roles: SelectOption[]) => [{
    type: 'select',
    name: 'role_id',
    label: 'Role',
    placeholder: 'Role',
    validators: [Validators.required],
    icon: 'fa-bullseye',
    options: roles
}]
