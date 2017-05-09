import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'bw-button',
    template: `
        <button 
            class="btn waves-effect bgm-{{color}} c-{{simpleColor}} btn-{{size}} {{class}}"
            type="{{type}}"
            [class.btn-icon-text]="iconAndtext"
            [class.btn-block]="block"
            [class.waves-circle]="circular"
            [class.waves-float]="circular"
            [class.btn-icon]="circular"
            [class.btn-rounded]="rounded"
            [class.btn-link]="simple"
            [disabled]="disabled"
            (click)="onClick($event)">
                <i class="zmdi zmdi-{{icon}}" *ngIf="icon"></i>
                {{title}}
        </button>
    `,
})
export class ButtonComponent implements OnInit {
    @Input() class: string;
    @Input() title: string;
    @Input() color: string;
    @Input() icon: string;
    @Input() block: boolean;
    @Input() circular: boolean;
    @Input() rounded: boolean;
    @Input() simple: boolean;
    @Input() type = 'button';

    @Input() size: string = ''; // lg, sm, xs
    @Input() disabled: boolean;

    @Output() clicked = new EventEmitter();

    simpleColor: string;

    constructor() { }

    get iconAndtext(): boolean {
        return this.title !== undefined && this.icon !== undefined && !this.circular;
    }

    ngOnInit() {
        if (this.simple) {
            this.simpleColor = this.color;
            this.color = '';
        }
    }

    onClick(e: MouseEvent): void {
        e.preventDefault();

        this.clicked.emit(undefined);
    }
}
