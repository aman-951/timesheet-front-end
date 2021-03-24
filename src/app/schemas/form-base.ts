import { FormGroupBase } from './form-group-base';

export interface FormBase extends FormGroupBase {
    groups?: FormGroupBase[]
}
