import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "ArraySort"
})
export class ArraySortPipe implements PipeTransform{
    public transform<T>(values: T[], comparer: (x: T, y: T) => number): T[] {
        return [...values].sort(comparer);
    }
}
