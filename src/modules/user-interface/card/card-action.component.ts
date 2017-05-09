import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'card-action',
    template: `
        <button class="btn btn-float waves-effect bgm-{{color}}" (click)="onClicked($event)">
            <i class="zmdi zmdi-{{icon}}"></i>
        </button>
    `,
})
export class CardActionComponent {

    @Input() color: string;
    @Input() icon: string;

    @Output() actionClicked = new EventEmitter();

    onClicked(event: MouseEvent): void {
        event.preventDefault();

        this.actionClicked.emit(undefined);
    }

}
