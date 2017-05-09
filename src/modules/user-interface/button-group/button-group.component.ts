import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bw-button-group',
  template: `
    <div class="btn-group btn-group-{{size}} {{class}}">
        <button
            class="btn waves-effect btn-{{type}}"
            *ngFor="let o of options"
            type="button"
            (click)="activateOption(o)"
            [class.active]="o === activeOption">
                {{o}}
        </button>
    </div>
  `,
})
export class ButtonGroupComponent {
    @Input() class: string;
    @Input() options: string[];
    @Input() type: string; // default, primary, info, success, warning, danger
    @Input() activeOption: string;
    @Input() size: string = 'default'; // lg, sm, xs

    @Output() optionSelected = new EventEmitter<string>();

    activateOption(option: string) {
        this.activeOption = option;

        this.optionSelected.emit(option);
    }

}
