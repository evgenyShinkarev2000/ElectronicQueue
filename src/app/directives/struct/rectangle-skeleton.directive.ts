import {
    ComponentRef,
    Directive,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef
} from "@angular/core";
import { RectangleSkeletonComponent } from "./rectangle-skeleton/rectangle-skeleton.component";

@Directive({
    selector: "[appRectangleSkeleton]"
})
export class RectangleSkeletonDirective<T> implements OnChanges {
    @Input("appRectangleSkeletonWidth")
    public width: number = 0;
    @Input("appRectangleSkeletonHeight")
    public height: number = 0;
    @Input("appRectangleSkeleton")
    public isLoading: boolean = true;

    constructor(private _templateRef: TemplateRef<T>,
                private _viewContainerRef: ViewContainerRef) {
    }

    public ngOnChanges(): void {
        this._viewContainerRef.clear();
        if (this.isLoading) {
            const componentRef: ComponentRef<RectangleSkeletonComponent> =
                this._viewContainerRef.createComponent(RectangleSkeletonComponent);
            componentRef.instance.height = this.height;
            componentRef.instance.width = this.width;
        }
        else{

            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
    }
}
