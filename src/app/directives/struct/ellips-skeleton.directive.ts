import { ComponentRef, Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from "@angular/core";
import { RectangleSkeletonComponent } from "./rectangle-skeleton/rectangle-skeleton.component";
import { EllipseSkeletonComponent } from "./ellipse-skeleton/ellipse-skeleton.component";

@Directive({
    selector: "[appEllipseSkeleton]"
})
export class EllipseSkeletonDirective<T> implements OnChanges {
    @Input("appEllipseSkeleton")
    public isLoading: boolean = true;
    @Input("appEllipseSkeletonWidth")
    public width: number;
    @Input("appEllipseSkeletonHeight")
    public height: number;

    constructor(private _templateRef: TemplateRef<T>,
                private _viewContainerRef: ViewContainerRef) {
    }

    public ngOnChanges(): void {
        if (!this.height && !this.width){
            return;
        }
        if (!this.height || !this.width){
            this.height = this.width ?? this.height;
            this.width = this.height ?? this.width;
        }

        this._viewContainerRef.clear();
        if (this.isLoading) {
            const componentRef: ComponentRef<EllipseSkeletonComponent> =
                this._viewContainerRef.createComponent(EllipseSkeletonComponent);
            componentRef.instance.height = this.height;
            componentRef.instance.width = this.width;
        }
        else{
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
    }
}
