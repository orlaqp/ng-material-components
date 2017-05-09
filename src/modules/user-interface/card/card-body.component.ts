import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'card-body',
    template: `
        <div class="card-body" [class.card-padding]="padded">
            <ng-content></ng-content>
        </div>
    `,
})
export class CardBodyComponent implements OnInit {

    @Input() padded: boolean = false;

    constructor() { }

    ngOnInit() { }
}
