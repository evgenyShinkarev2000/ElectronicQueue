import { FormControl, ValidatorFn } from "@angular/forms";
import { HTMLInputTypeAttribute } from "./input-attributes.interface";
import { IFormExtensionOptionalParam } from "./form-control-extesion-optional-param.interface";

export class FormControlExtension extends FormControl {
    public readonly name: string;
    public placeHolder: string = "";
    public readonly type: HTMLInputTypeAttribute;
    public descriptionLabel: string = "";

    constructor(
        name: string,
        validatorFn?: ValidatorFn | ValidatorFn[],
        optionalParam?: IFormExtensionOptionalParam
    ) {
        super(null, validatorFn);

        if (!name) {
            throw new Error("Требуется имя для FormControl");
        }

        this.name = name;
        if (!optionalParam){
            return;
        }
        this.placeHolder = optionalParam.placeHolder ?? name;
        this.type = optionalParam.type ?? "text";
        this.descriptionLabel = optionalParam.descriptionLabel ?? "";
    }

    public get errorMessages(): string[] {
        const selector: { [key: string]: string } = {
            "required": "Поле обязательно"
        };

        const errors: string[] = Object.keys(this.errors).filter((errorName: string) => this.errors[errorName]);
        const errorMessages: string[] = [];

        errors.forEach((errorName: string) =>
            errorMessages.push(errorName in selector ? selector[errorName] : `Неизвестная ошибка ${errorName}`));

        return errorMessages;
    }
}
