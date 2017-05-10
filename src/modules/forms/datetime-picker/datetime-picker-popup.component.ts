// from: https://github.com/ng2-ui/ng2-datetime-picker

import {
  Component,
  ElementRef,
  ViewEncapsulation,
  ChangeDetectorRef,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {DateTime} from './datetime';

// @TODO
// . display currently selected day

/**
 * show a selected date in monthly calendar
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  providers    : [DateTime],
  selector     : 'bw-datetime-picker-popup',
  styleUrls    : [
    './datetime-picker-popup.component.css',
  ],
  template: `
    <div class="datetime-picker" tabindex="0">
      <!-- Month - Year-->
      <div class="month">
        <button class="prev" type="button" (click)="updateMonthData(-1)">
          <i class="zmdi zmdi-chevron-left"></i></button>
          <span title="{{dateTime.months[monthData.month].fullName}}">
            {{dateTime.months[monthData.month].fullName}}
          </span>    {{monthData.year}}
        <button class="next" type="button" (click)="updateMonthData(+1)">
          <i class="zmdi zmdi-chevron-right"></i></button>
      </div>
      <div class="days">
        <!-- Su Mo Tu We Th Fr Sa-->
        <div class="day-of-week" *ngFor="let dayOfWeek of dateTime.localizedDaysOfWeek"
          [ngClass]="{weekend: dayOfWeek.weekend}" title="{{dayOfWeek.fullName}}">{{dayOfWeek.shortName}}</div>
        <!-- Fill up blank days for this month-->
        <div *ngIf="monthData.leadingDays.length &lt; 7">
          <div class="day" *ngFor="let dayNum of monthData.leadingDays"
            [ngClass]="{weekend: [0,6].indexOf(toDate(monthData.year, monthData.month-1, dayNum).getDay()) !== -1}">
              {{dayNum}}
          </div>
        </div>
        <div class="day selectable" *ngFor="let dayNum of monthData.days"
          (click)="selectDate(dayNum)" title="{{monthData.year}}-{{monthData.month+1}}-{{dayNum}}"
          [ngClass]="{ selected: toDate(monthData.year, monthData.month, dayNum)
              .getTime() === toDateOnly(selectedDate).getTime(),
              today:    toDate(monthData.year, monthData.month, dayNum).getTime() === today.getTime(),
              weekend:    [0,6].indexOf(toDate(monthData.year, monthData.month, dayNum).getDay()) !== -1 }">
                {{dayNum}}</div>
        <!-- Fill up blank days for this month-->
        <div *ngIf="monthData.trailingDays.length &lt; 7">
          <div class="day" *ngFor="let dayNum of monthData.trailingDays"
            [ngClass]="{weekend: [0,6].indexOf(toDate(monthData.year, monthData.month+1, dayNum).getDay()) !== -1}">
              {{dayNum}}</div>
        </div>
      </div>
      <!-- Time-->
      <div class="days" id="time" *ngIf="!dateOnly">
        <label class="timeLabel">Time:
        </label><span class="timeValue">
          {{("0"+hour).slice(-2)}} : {{("0"+minute).slice(-2)}}
          </span><br/>
        <label class="hourLabel">Hour:</label>
        <input class="hourInput" #hours="" (change)="selectDate()" type="range" min="0" max="23" [(ngModel)]="hour"/>
        <label class="minutesLabel">Min:</label>
        <input class="minutesInput" #minutes="" (change)="selectDate()"
          type="range" min="0" max="59" range="10" [(ngModel)]="minute"/>
      </div>
    </div>
    <!-- <hr/>-->
    <!-- Date: {{selectedDate}}<br/>-->
    <!-- Hour: {{hour}} Minute: {{minute}}<br/>-->
  `
})
export class DateTimePickerPopupComponent implements AfterViewInit {
  /**
   * public variables
   */
  public dateOnly: boolean;

  public selectedDate: Date; // currently selected date
  public hour: number;
  public minute: number;

  public el: HTMLElement; // this component element
  public monthData: any;  // month calendar data

  public changes: EventEmitter<any> = new EventEmitter();
  public closing: EventEmitter<any> = new EventEmitter();

  @ViewChild('hours')
  private hours: ElementRef;
  @ViewChild('minutes')
  private minutes: ElementRef;

  public constructor(elementRef: ElementRef, public dateTime: DateTime, public cdRef: ChangeDetectorRef) {
    this.el = elementRef.nativeElement;
  }

  public ngAfterViewInit(): void {
    if (!this.dateOnly) {
      this.hours.nativeElement.addEventListener('keyup', (e: KeyboardEvent) => {
        e.stopPropagation();
      });
      this.hours.nativeElement.addEventListener('mousedown', (e: KeyboardEvent) => {
        e.stopPropagation();
      });
      this.minutes.nativeElement.addEventListener('keyup', (e: KeyboardEvent) => {
        e.stopPropagation();
      });
      this.minutes.nativeElement.addEventListener('mousedown', (e: KeyboardEvent) => {
        e.stopPropagation();
      });
    }
  }

  public get year (): number {
    return this.selectedDate.getFullYear();
  }

  public get month (): number {
    return this.selectedDate.getMonth();
  }

  public get day (): number {
    return this.selectedDate.getDate();
  }

  public get today (): Date {
    const dt = new Date();
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt;
  }

  public initDateTime(date: Date) {
    date = date || new Date();
    this.selectedDate = date;
    this.hour         = this.selectedDate.getHours();
    this.minute       = this.selectedDate.getMinutes();
    this.monthData    = this.dateTime.getMonthData(this.year, this.month);
  }

  public toDate(year: number, month: number, day: number): Date {
    return new Date(year, month, day);
  }

  public toDateOnly(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }

  /**
   * set the selected date and close it when closeOnSelect is true
   * @param date {Date}
   */
  public selectDate(dayNum?: number) {
    if (dayNum) {
      this.selectedDate = new Date(this.monthData.year, this.monthData.month, dayNum);
    }
    this.selectedDate.setHours(parseInt( '' + this.hour || '0', 10));
    this.selectedDate.setMinutes(parseInt( '' + this.minute || '0', 10));
    this.changes.emit(this.selectedDate);
    this.closing.emit(true);
  }

  /**
   * show prev/next month calendar
   */
  public updateMonthData(num: number) {
    this.monthData = this.dateTime.getMonthData(this.monthData.year, this.monthData.month + num);
  }

}
