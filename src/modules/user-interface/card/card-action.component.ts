import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'bw-card-action',
    template: `
        <button class="btn btn-float waves-effect bgm-{{color}}" (click)="onClicked($event)">
            <i class="zmdi zmdi-{{icon}}"></i>
        </button>
    `,
})
export class CardActionComponent {

    @Input() public color: string;
    @Input() public icon: string;

    @Output() private actionClicked = new EventEmitter();

    public onClicked(event: MouseEvent): void {
        event.preventDefault();

        this.actionClicked.emit(undefined);
    }

}
