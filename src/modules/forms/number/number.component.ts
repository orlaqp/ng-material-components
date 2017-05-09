import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase } from '../input-base/input-base.component';
import { TypeEnum } from '../../../models/type-enum';
import { NumberMaskConfig } from '../mask/addons/create-number-mask';
import createNumberMask from '../mask/addons/create-number-mask';

const template = `
    <div class="input-group m-b-15 w-100" [class.fg-float]="floatingLabel" [class.fc-alt]="alt" style="width: 100%" [ngClass]="{ 'has-error': !control.valid &amp;&amp; (fg.submitted || control.dirty)}">
    <label *ngIf="label &amp;&amp; !floatingLabel">{{label}}</label><span class="input-group-addon" *ngIf="leftIcon"><i class="zmdi zmdi-{{leftIcon}}"></i></span>
    <div class="fg-line" [class.disabled]="disabled" [class.fg-toggled]="toggled">
        <input class="form-control" #i="#i" type="text" [textMask]="{ control: control, mask: numberMask }" placeholder="{{placeholder}}" [formControl]="control" [disabled]="disabled" (focus)="onFocus(i)" (blur)="onBlur(i)" />
        <label class="fg-label" *ngIf="label &amp;&amp; floatingLabel">{{label}}</label>
    </div><span class="input-group-addon last" *ngIf="rightIcon"><i class="zmdi zmdi-{{rightIcon}}"></i></span>
    <div *ngIf="!control.valid &amp;&amp; (control.dirty || fg.submitted)"><small class="help-block animated fadeInDown" *ngFor="let v of validations" [class.hidden]="!control.errors[v.type]">{{v.message}}</small>
    </div>
</div>
`


@Component({
    selector: 'number',
    template: template,
    styles: ['.form-control { text-align: right; } '],
})
export class NumberComponent extends InputBase implements OnInit {

    @Input() fg: FormGroup;
    @Input() placeholder: string;
    @Input() field: string;
    @Input() label: string;
    @Input() floatingLabel: boolean;
    @Input() leftIcon: string;
    @Input() rightIcon: string;
    @Input() disabled: boolean;
    @Input() value: number;
    @Input() alt: boolean;

    @Input() decimal: boolean;
    @Input() currency: boolean;
    @Input() percent: boolean;
    @Input() prefix: string;
    @Input() suffix: string;
    @Input() decimalPlaces: number;

    // validators
    @Input() required: boolean;
    @Input() min: number;
    @Input() max: number;

    public numberMask: (rawValue: any) => string[];

    constructor(el: ElementRef) {
        super(el);
        this.dataType = TypeEnum.Number;
    }

    public addValidators(): void {
        this.addMinValidation();
        this.addMaxValidation();
    }

    public ngOnInit(): void {
        this.onInit();

        let maskConfig: NumberMaskConfig = {
            allowDecimal: this.decimal,
            prefix: this.prefix || '',
            suffix: this.suffix,
            decimalLimit: this.decimalPlaces,
        };

        // currency
        if (this.currency && !this.prefix) {
            maskConfig.prefix = '$ ';
            maskConfig.allowDecimal = true;
            maskConfig.decimalLimit = 2;
        }

        // percent
        if (this.percent) {
            maskConfig.suffix = ' %';
            maskConfig.allowDecimal = true;
            maskConfig.decimalLimit = 2;
        }

        this.numberMask = createNumberMask(maskConfig);
    }

    public ngOnDestroy(): void {

    }

}
