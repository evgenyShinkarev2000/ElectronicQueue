import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'app-rectangle-skeleton',
    templateUrl: './rectangle-skeleton.component.html',
    styleUrls: ['./rectangle-skeleton.component.scss']
})
export class RectangleSkeletonComponent implements AfterViewInit {

    @ViewChild("ref")
    public elementRef: ElementRef;
    public width: number = 100;
    public height: number = 100;
    constructor(private _renderer2: Renderer2) {
    }

    public ngAfterViewInit(): void {
        this._renderer2.setStyle(this.elementRef.nativeElement, "width", this.width + "px");
        this._renderer2.setStyle(this.elementRef.nativeElement, "height", this.height + "px");
        this._renderer2.addClass(this.elementRef.nativeElement, "added");
    }

}
