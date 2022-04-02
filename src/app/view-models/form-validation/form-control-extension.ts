import { FormControl, ValidatorFn } from "@angular/forms";
import { HTMLInputTypeAttribute, IInputAttributes } from "./input-attributes.interface";

export class FormControlExtension extends FormControl {
    public readonly name: string;
    public readonly placeHolder: string;
    public readonly type: HTMLInputTypeAttribute;

    constructor(
        name: string,
        validatorFn?: ValidatorFn | ValidatorFn[],
        attributes?: IInputAttributes
    ) {
        super(null, validatorFn);

        if (!name) {
            throw new Error("Требуется имя для FormControl");
        }

        this.placeHolder = attributes?.placeHolder ?? name;
        this.type = attributes?.type ?? "text";
        this.name = name;
    }

    public get errorMessages(): string[] {
        const selector: { [key: string]: string } = {
            "required": "Поле Обязательно"
        };

        const errors: string[] = Object.keys(this.errors).filter((errorName: string) => this.errors[errorName]);
        const errorMessages: string[] = [];

        errors.forEach((errorName: string) =>
            errorMessages.push(errorName in selector ? selector[errorName] : `Неизвестная ошибка ${errorName}`));

        return errorMessages;
    }
}
