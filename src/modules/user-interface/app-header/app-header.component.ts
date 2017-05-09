import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '../../../models/menu-item';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    template: `
        <header class="clearfix animated slideInDown {{class}}" id="header" [attr.data-current-skin]="color">
            <ul class="header-inner">
                <!-- menu trigger-->
                <li id="menu-trigger" [attr.data-trigger]="'#sidebar'" *ngIf="addMenuTrigger && !backActive" [class.open]="sidebarOpen" (click)="toggleSidebar()">
                <div class="line-wrap">
                    <div class="line top"></div>
                    <div class="line center"></div>
                    <div class="line bottom"></div>
                </div>
                </li>
                <li id="menu-trigger" *ngIf="backActive" (click)="backActionClicked()" [class.open]="backActive">
                <div class="line-wrap">
                    <div class="line top"></div>
                    <div class="line center"></div>
                    <div class="line bottom"></div>
                </div>
                </li>
                <!-- brand-->
                <li class="logo" *ngIf="brand"><a [href]="logoHref">{{brand}}</a></li>
                <!-- logo-->
                <li *ngIf="!brand && logo"><a class="m-l-10" [href]="logoHref"><img [src]="logoPath"/></a></li>
                <li class="pull-right" *ngIf="actions">
                <actions color="white" [actionItems]="actions" [showBig]="true" (actionClicked)="headerActionClicked($event)"></actions>
                </li>
            </ul>
            <!-- for extra content injection-->
            <ng-content></ng-content>
        </header>
    `,
})
export class AppHeaderComponent {
    @Input() class: string;
    @Input() color: string;
    @Input() addMenuTrigger: boolean;
    @Input() brand: string;
    @Input() sidebarOpen: boolean = false;
    @Input() actions: MenuItem[];
    @Input() logoPath: string;
    @Input() logoHref: string = '/';
    @Input() backActive: boolean = false;

    @Output() onSidebarToggle = new EventEmitter();
    @Output() onActionClicked = new EventEmitter();
    @Output() onbackActionClicked = new EventEmitter();

    constructor(private _router: Router) { }

    toggleSidebar(): void {
        this.sidebarOpen = !this.sidebarOpen;
        this.onSidebarToggle.emit(this.sidebarOpen);
    }

    headerActionClicked(item: MenuItem) {
        this.onActionClicked.emit(item);
    }

    backActionClicked() {
         this.onbackActionClicked.emit();
    }
}
