import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../../models/menu-item';
import { ActionsService } from './actions.service';

@Component({
  providers: [ ActionsService ],
  selector: 'bw-actions',
  template: `
    <ul class="actions c-{{color}} {{class}}"
        [ngClass]="{ 'actions-alt': alt, 'dropdown': dropdown }"
        [class.actions]="!showBig"
        [class.top-menu]="showBig">
            <li *ngFor="let item of actionItems" [bwActionItem]="item"></li>
    </ul>
  `,
})
export class ActionsComponent implements OnInit {
    @Input() public actionItems: MenuItem[];
    @Input() public alt: boolean = false;
    @Input() public showBig: boolean = false;
    @Input() public color: string = 'light-gray';
    @Input() public class: string;

    @Output() private actionClicked = new EventEmitter();

    constructor(private actionsService: ActionsService) {
        actionsService.actionClicked$.subscribe((actionItem) => {
            this.actionClicked.emit(actionItem);
        });
    }

    public ngOnInit() {
        this.actionsService.showBig = this.showBig;

        if (!this.actionItems || this.actionItems.length === 0) {
            throw new Error('Actions component need actions to show');
        }
    }

    get dropdown(): boolean {
        // if any action item contain children the I should add the dropdown class
        return this.actionItems.some((item: MenuItem) => {
            return item.children !== undefined;
        });
    }
}
