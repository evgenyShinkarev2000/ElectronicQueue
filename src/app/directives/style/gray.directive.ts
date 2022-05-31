import { Directive, HostBinding, OnChanges, OnInit } from "@angular/core";

@Directive({
    selector: "[appGray]"
})
export class GrayDirective {
    @HostBinding("class.gray")
    public t: any = "gray";

    constructor() {
    }
}
