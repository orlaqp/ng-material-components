import {
    Subscription
} from 'rxjs/Rx';
import {
    isArray
} from 'util';
/* tslint:disable */
import {
    selectPickerTemplate
} from './select-picker.template';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output
} from '@angular/core';
import {
    FormGroup,
    FormControl,
} from '@angular/forms';
import {
    SelectionItem
} from '../../../models/selection-item';
import {
    InputBase
} from '../input-base/input-base.component';
declare var $: any;

import {
    processPolyfills,
} from './polyfills';

processPolyfills();

@Component({
    selector: 'bw-select-picker',
    template: selectPickerTemplate,
})
export class SelectPickerComponent extends InputBase implements OnChanges, OnDestroy {

    @Input() public fg: FormGroup;
    @Input() public field: string;
    @Input() public value: string;
    @Input() public disabled: boolean;
    @Input() public placeholder: string;
    @Input() public alt: boolean;
    @Input() public leftIcon: string;
    @Input() public rightIcon: string;
    @Input() public dependOnField: string;

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

    @Output() public dependantValueChanged = new EventEmitter < string > ()


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
    selection = this.noneSelectedText;
    query: FormControl;

    private _clonedItems: SelectionItem[];
    private _dependOnFieldSubscription: Subscription;
    private _querySubscription: Subscription;
    private _lastValue: any;

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
        const that = this;

        this.onInit();

        this.query = new FormControl();

        // watch filter changes
        this._querySubscription = this.query.valueChanges.subscribe(filter => {
            that._filterResults(filter);
        });

        // watch value changes
        this.control.valueChanges.subscribe(data => {
            if (data) {
                this._lastValue = data;
            }
            that._updateSelection();
        });

        // if this control depend on another field then listen for changes on it
        if (this.dependOnField) {
            const formField = this.fg.get(this.dependOnField);

            if (formField) {
                this._dependOnFieldSubscription = formField.valueChanges
                    .subscribe(v => {
                        that.dependantValueChanged.emit(v);
                    });
            }
        }
    }

    public ngOnDestroy() {
        if (this._dependOnFieldSubscription) this._dependOnFieldSubscription.unsubscribe();
        if (this._querySubscription) this._querySubscription.unsubscribe();
    }

    public ngOnChanges(changes: {
        [propertyName: string]: any
    }) {
        let that = this;

        if (changes['items']) {
            let clone: SelectionItem[] = [];

            let newItemList = changes['items'].currentValue;
            if (newItemList) {
                clone = newItemList.map((item: SelectionItem) => {
                    return {
                        id: item.id,
                        title: item.title,
                        disabled: item.disabled,
                        selected: item.selected,
                    };
                });
            }

            that._clonedItems = clone;
            this._updateSelection()
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
            this.control.setValue(item.id);
        } else {
            this._processMultipleSelection(item);
        }
    }

    public addValidators(): void {}

    private _updateSelectionText() {

        if (this._clonedItems) {
            this.selection = this._clonedItems
                .filter(item => {
                    return item.selected;
                })
                .map(item => {
                    return item.title;
                })
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

                if (!item || !item.title) {
                    return false;
                }

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

        const newSelectedItemIds = this._clonedItems
            .filter(i => i.selected)
            .map(i => i.id)
            .join(',');

        this.control.setValue(newSelectedItemIds);
    }

    private _updateSelection() {
        const that = this;
        let value = this.control ? this.control.value : null || this.value;
        
        this._filterResults(this.query ? this.query.value : null);

        if (this._lastValue && !value) {
            value = this._lastValue;
        }

        if (!value || value === '' ||
            !this._clonedItems || this._clonedItems.length < 1) {
            return;
        }

        let dataItems: string[] = [];
        let newSelection: string[] = [];

        if (typeof value === 'string') { // coma delimited string
            dataItems = value.split(',');
        } else if (isArray(value)) { // array of ids
            dataItems = value.map(d => String(d));
        }

        if (!this.multiple) {
            this._clonedItems.forEach(i => i.selected = false);
        }

        for (let i = 0; i < this._clonedItems.length; i++) {
            const index = dataItems.find(e => e === that._clonedItems[i].id);
            if (index) {
                that._clonedItems[i].selected = true;
                newSelection = newSelection.concat(String(that._clonedItems[i].title));
            }
        }

        // remove the current value if does not apply anymore
        const newValueCheckedAgainstItems = that._clonedItems
            .filter(i => i.selected)
            .map(i => i.id)
            .join(',');

        if (this.control.value !== newValueCheckedAgainstItems) {
            this.control.setValue(newValueCheckedAgainstItems, { emitEvent: false });
        }

        this._updateSelectionText();
       
    }

}