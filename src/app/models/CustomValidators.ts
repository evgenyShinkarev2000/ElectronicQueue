import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    public static minMinutes(minMinutes: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const timeStr: string = control.value;
            if (!timeStr){
                return null;
            }
            const timeTokens: string[] = timeStr.split(":");
            const hours: number = parseInt(timeTokens[0]);
            const minutes: number = parseInt(timeTokens[1]);
            if (isNaN(hours) || isNaN(minutes) || minutes + hours * 60 < minMinutes) {
                return { forbiddenName: { value: control.value } };
            }

            return null;
        };
    }
}
