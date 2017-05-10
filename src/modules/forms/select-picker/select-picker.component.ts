/* tslint:disable */
import { selectPickerTemplate } from './select-picker.template';
import { Component, Input, ElementRef, OnChanges } from '@angular/core';
import {
    FormGroup,
    FormControl,
} from '@angular/forms';
import { SelectionItem } from '../../../models/selection-item';
import { InputBase } from '../input-base/input-base.component';
declare var $: any;

import {
    processPolyfills,
} from './polyfills';

processPolyfills();

@Component({
    selector: 'bw-select-picker',
    template: selectPickerTemplate,
})
export class SelectPickerComponent extends InputBase implements OnChanges {

    @Input() public fg: FormGroup;
    @Input() public field: string;
    @Input() public disabled: boolean;
    @Input() public placeholder: string;
    @Input() public alt: boolean;
    @Input() public leftIcon: string;
    @Input() public rightIcon: string;

    // options
    @Input() public items: SelectionItem[];
    @Input() public multiple: boolean = false;
    @Input() public autofocus: boolean = false;

    @Input() public noneSelectedText: string = 'Nothing selected';
    @Input() public noneResultsText: string = 'No results matched ';
    @Input() public multipleSeparator: string = ', ';
    @Input() public liveSearch: boolean = false;
    @Input() public liveSearchPlaceholder: string | null = null;
    @Input() public liveSearchStyle: string = 'contains'; // or startsWith
    @Input() public maxOptions: number = 100;
    @Input() public isMobile: boolean = false;
    @Input() public tickIcon: string = 'zmdi-check';


    // @Input() selectAllText: string = 'Select All';
    // @Input() deselectAllText: string = 'Deselect All';
    // @Input() doneButton: boolean = false;
    // @Input() doneButtonText: string = 'Close';
    // @Input() styleBase: string = 'btn';
    // @Input() style: string = 'btn-default';
    // @Input() size: string | number = 'auto';
    // @Input() title: string = null;
    // @Input() selectedTextFormat: string = 'values';
    // @Input() width: string = null;
    // // @Input() container: JQuery = null;
    // @Input() hideDisabled: boolean = false;
    // @Input() showSubtext: boolean = false;
    // @Input() showIcon: boolean = true;
    // @Input() showContent: boolean = true;
    // @Input() dropupAuto: boolean = true;
    // @Input() header: string = null;
    // @Input() liveSearchNormalize: boolean = false;
    // @Input() actionsBox: boolean = false;
    // @Input() iconBase: string = 'zmdi';
    // @Input() showTick: boolean = false;
    // @Input() template: any = {
    //     caret: '<span class="caret"></span>',
    // };
    // @Input() selectOnTab: boolean = false;
    // @Input() dropdownAlignRight: boolean | string = false;

    open: boolean = false;
    filteredItems: SelectionItem[];
    selection: string;
    query: FormControl;

    private _clonedItems: SelectionItem[];

    // @Input() countSelectedText: Function = (numSelected: number, numTotal: number) => {
    //     return (numSelected === 1) ? '{0} item selected' : '{0} items selected';
    // };
    // @Input() maxOptionsText: Function = (numAll: number, numGroup: number) => {
    //     return [
    //         (numAll === 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)',
    //         (numGroup === 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)',
    //     ];
    // };

    constructor(private el: ElementRef) {
        super(el);
    }

    public ngOnInit(): void {
        this.onInit();

        this.query = new FormControl();

        this.query.valueChanges.subscribe(filter => {
            this._filterResults(filter);
        });

        this._updateValue();
    }

    public ngOnChanges(changes: {[propertyName: string]: any}) {
        let that = this;

        if (changes['items']) {
            let clone: SelectionItem[] = [];

            let currentValue = changes['items'].currentValue;
            if (currentValue) {
                clone = currentValue.map((item: SelectionItem) => {
                    return {
                        id: item.id,
                        title: item.title,
                        disabled: item.disabled,
                        selected: item.selected,
                    };
                });
            }

            that._clonedItems = clone;
            this._updateSelectionText();

            if (this.initialized) {
                this._updateValue();
            }

            this._filterResults(null);
        }
    }

    get emptySearch(): boolean {
        return this.filteredItems === undefined || this.filteredItems.length === 0;
    }

    toggleOpen() {
        this.open = !this.open;
    }

    toggleItem(item: SelectionItem) {
        if (!this.multiple) {
            this._clonedItems.forEach(item => {
                item.selected = false;
            });

            item.selected = !item.selected;
        } else {
            this._processMultipleSelection(item);
        }

        this._updateSelectionText();
        this._updateValue();
    }

    public addValidators(): void { }

    private _updateValue() {
        let selectedItems = this._clonedItems
            .filter(item => item.selected)
            .map(item => item.id);
        let values = selectedItems.join(',');
        this.control.setValue(values);
        this.value = values;
    }

    private _updateSelectionText() {

        if (this._clonedItems) {
            this.selection = this._clonedItems
                .filter(item => { return item.selected; })
                .map(item => { return item.title; })
                .join(this.multipleSeparator);
        }

        if (!this.selection) {
            this.selection = this.noneSelectedText;
        }
    }

    private _filterResults(filter: string | null) {
        let contains = this.liveSearchStyle === 'contains';

        if (!filter || filter === '') {
            this.filteredItems = this._clonedItems;
        } else {
            this.filteredItems = this._clonedItems.filter(item => {

                if (!item || !item.title) { return false; }

                return contains ?
                    item.title.toLowerCase().includes(filter.toLowerCase()) :
                    item.title.toLowerCase().startsWith(filter.toLowerCase());
            });
        }
    }

    private _processMultipleSelection(item: SelectionItem) {
        let selectedItems = this._clonedItems.filter(item => {
            return item.selected;
        });

        // only select the items if we are under the max options
        if (!item.selected && selectedItems.length >= this.maxOptions) {
            return;
        }

        item.selected = !item.selected;
    }

}