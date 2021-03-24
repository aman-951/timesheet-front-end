import { ValidatorFn } from '@angular/forms';
import { SelectOption } from './select-option';

export interface FormGroupBase {
    type: string,
    name?: string,
    label?: string,
    placeholder?: string,
    validators?: ValidatorFn[],
    maxlength?: number,
    icon?: string,
    hint?: string,
    options?: SelectOption[]
}
