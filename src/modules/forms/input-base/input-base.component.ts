import { ElementRef } from '@angular/core';
import {
    FormGroup,
    Validators } from '@angular/forms';
import { SubmitableFormGroup } from '../../../models/submitable-form-group';
import { ControlWithType } from '../../../models/control-with-type';
import { TypeEnum } from '../../../models/type-enum';
import { CustomValidators } from '../validators/custom-validators';
import { ValidationInfo } from '../../../models/validation-info';

export class InputBase {

    public static minValidator(length: number): ValidationInfo {
        return {
            message: `At least ${length} characters are required`,
            type: 'minlength',
            validator: Validators.minLength(length),
        };
    }

    public static maxValidator(length: number): ValidationInfo {
        return {
            message: `No more than ${length} characters are allowed`,
            type: 'maxlength',
            validator: Validators.maxLength(length),
        };
    }

    public dataType: TypeEnum;
    public model: object;
    public fg: FormGroup;
    public field: string;
    public floatingLabel: boolean;
    public required: boolean;
    public min: number;
    public max: number;
    public value: any;
    public decimal: boolean;

    public validations: ValidationInfo[];
    public control: ControlWithType;
    public toggled: boolean;
    public inputType: string = 'text'; // text, password, number, email, datetime, date

    public ele: ElementRef;

    public initialized = false;

    constructor(el: ElementRef) {
        this.ele = el;
        this.validations = [];
        // be default assign string type becasue it is the most common
        this.dataType = TypeEnum.String;
    }

    public onFocus(ele: any): void {
        this.toggled = true;
    }

    public onBlur(ele: any): void {
        if (!this.control.value) {
            this.toggled = false;
        }
    }

    public addValidators(): void {
        throw new Error('Validators should be defined at the derived class');
    }

    public addMinValidation(): void {
        if (this.min) {
            this.validations.push({
                message: `Minimum aceptable value is ${this.min}`,
                type: 'tooLow',
                validator: CustomValidators.minNumber(this.min),
            });
        }
    }

    public addMaxValidation(): void {
        if (this.max) {
            this.validations.push({
                message: `Maximum aceptable value is ${this.max}`,
                type: 'tooHigh',
                validator: CustomValidators.maxNumber(this.max),
            });
        }
    }

    public onInit(): void {
        // by default labels should float
        if (this.floatingLabel === undefined) {
            this.floatingLabel = true;
        }

        this._processControl(this.field);

        if (this.control.value) {
            this.toggled = true;
        }

        this.initialized = true;
    }

    private _getValidators(): any {
        this.addValidators();

        if (this.required) {
            this.validations.push({
                message: 'This field is required',
                type: 'required',
                validator: Validators.required,
            });
        }

        const validators: any = [];

        // only add validators if neccessary
        if (this.validations.length > 0) {
            this.validations.forEach((item: ValidationInfo) => validators.push(item.validator));
        }

        return validators;
    }

    private _processControl(field: string): void {
        const that: InputBase = this;
        const pathTokens: string[] = field.split('.');
        // the latest element is the array indicates the control name so I should
        // not process it
        const fieldName: string = pathTokens.pop() || '';
        let fg: FormGroup = that.fg;

        // create controls group tree
        pathTokens.forEach((token: string) => {
            if (!fg.controls[token]) {
                fg.addControl(token, new SubmitableFormGroup({}));
            }
            fg = fg.controls[token] as FormGroup;
        });

        // make sure value is not null
        if (!this.value) {
            this.value = '';
        }

        const validators: any = this._getValidators();
        this.control = new ControlWithType(
            this.dataType,
            this.value,
            Validators.compose(validators));

        // subscribe for changes
        this.control.valueChanges.subscribe((data) => {
            that.toggled = data !== undefined && data !== '';
        });

        // because I am using an input mask control I need to pass this info
        // in order to treat the validators correctly (expect always two decimal places)
        this.control.__isDecimal = this.decimal;
        fg.addControl(fieldName, this.control);

        // if (!this.required) {
        //     fg.exclude(fieldName);
        // }
    }

}
