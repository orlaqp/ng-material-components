export const selectPickerTemplate = `
    <div class="input-group m-b-15 w-100" [class.fc-alt]="alt" [ngClass]="{ 'has-error': !control.valid &amp;&amp; (fg.submitted || control.dirty)}"><span class="input-group-addon" *ngIf="leftIcon"><i class="zmdi zmdi-{{leftIcon}}"></i></span>
    <div class="btn-group bootstrap-select" [class.fc-alt]="alt">
        <button class="btn dropdown-toggle btn-default" type="button" data-toggle="dropdown" role="button" title="{{selected}}" aria-expanded="true" (click)="toggleOpen()"><span class="filter-option pull-left">{{selection}}</span><span class="bs-caret"><span class="caret"></span></span>
        </button>
        <div class="dropdown-menu" [class.open]="open" role="combobox" style="max-height: 394px; overflow: hidden; min-height: 0px">
            <div class="bs-searchbox" *ngIf="liveSearch">
                <input class="form-control" [formControl]="query" type="text" autocomplete="off" role="textbox" aria-label="Search" placeholder="{{liveSearchPlaceholder}}" />
            </div>
            <ul class="dropdown-menu inner" role="listbox" aria-expanded="true" style="max-height: 392px; overflow-y: auto; min-height: 0px">
                <li *ngFor="let item of filteredItems; let idx = index" [attr.data-original-index]="idx" [class.selected]="item.selected" (click)="toggleItem(item)"><a tabindex="{{idx}}" [attr.data-tokens]="null" role="option" [attr.aria-disabled]="item.disabled" [attr.aria-selected]="item.selected"><span class="text">{{item.title}}</span><span class="zmdi check-mark {{tickIcon}}"></span></a>
                </li>
                <li class="no-results" *ngIf="emptySearch">{{ noneResultsText }} "{{ query.valueChanges | async }}"</li>
            </ul>
        </div>
        <select class="my-selectpicker" style="display: none" tabindex="-98" [class.mobile-device]="isMobile" [attr.multiple]="multiple">
            <option *ngFor="let item of filteredItems" value="{{item.id}}" [attr.selected]="item.selected ? true : null">{{item.title}}</option>
        </select>
    </div><span class="input-group-addon last" *ngIf="rightIcon"><i class="zmdi zmdi-{{rightIcon}}"></i></span>
</div>
`;