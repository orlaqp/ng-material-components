import { Component, Input } from '@angular/core';

@Component({
    selector: 'card',
    template: `
        <div class="card {{depthClass}} {{topDepthClass}} {{class}}">
            <ng-content></ng-content>
        </div>
    `,
})
export class CardComponent {
    @Input() depth: number;
    @Input() topDepth: number;
    @Input() class: string;

    get depthClass(): string {
        return this.depth ? `z-depth-${this.depth}` : '';
    }

    get topDepthClass(): string {
        return !this.depth && this.topDepth ? `z-depth-${this.topDepth}-top` : '';
    }
}
