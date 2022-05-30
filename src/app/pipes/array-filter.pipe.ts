import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "ArrayFilter"
})
export class ArrayFilterPipe implements PipeTransform{
    public transform<T, U>(values: T[], propSelector: (x: T) => U, passValues: U[]): T[] {
        return values.filter((value: T) => passValues.includes(propSelector(value)));
    }


}
