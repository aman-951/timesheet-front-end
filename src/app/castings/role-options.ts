import { Role } from "../schemas/role";
import { SelectOption } from "../schemas/select-option";

export default function roleOption(params: Role[]): SelectOption[] {
    let result: SelectOption[] = []
    for (let param of params)
        result.push({ value: param.id, label: param.name })

    return result
}