import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'bw-header',
    template: `
        <div class="{{class}}" [class.block-header]="block">
            <ng-content></ng-content>
        </div>
    `,
})
export class HeaderComponent implements OnInit {
    @Input() class: string;
    @Input() block: boolean;

    constructor() { }

    ngOnInit() { }
}
