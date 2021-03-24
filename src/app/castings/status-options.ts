import { SelectOption } from "../schemas/select-option";
import { Status } from "../schemas/status";

export default function statusOption(params: Status[]): SelectOption[] {
    let result: SelectOption[] = []
    for (let param of params)
        result.push({ value: param.id, label: param.name })

    return result
}