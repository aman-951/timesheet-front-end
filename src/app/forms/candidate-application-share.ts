import { Validators } from "@angular/forms";
import { FormBase } from "../schemas/form-base";

export const CandidateApplicationShare: FormBase[] = [{
    type: 'text',
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    validators: [Validators.required, Validators.email],
    icon: 'fa-envelope'
}]
