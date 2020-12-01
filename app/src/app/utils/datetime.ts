import * as moment from 'moment';

export class DateTime {

  protected time: moment.Moment;

  constructor(refTime: string | number = null) {
    if ('number' === typeof refTime) {
      this.time = moment(refTime);
    } else {
      this.time = refTime ? moment.parseZone(refTime) : moment();
    }
  }

  public static getTimeZone() {
    const now = moment();
    return now.format('Z');
  }

  public static formatDuration(value: number, type: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds', format: string = 'YYYY-MM-DDTHH:mm:ssZ') {
    const now = new DateTime();
    return now.clone().add(value, type).getDifference(now, format);
  }

  //#region Set/Get Time
  public getYear(): number {
    return this.time.year();
  }

  public getMonth(): number {
    return this.time.month();
  }

  public getDay(): number {
    return this.time.date();
  }

  public getHour(): number {
    return this.time.hour();
  }

  public getMinute(): number {
    return this.time.minute();
  }

  public getSecond(): number {
    return this.time.second();
  }

  public setYear(year: number): DateTime {
    this.time.year(year);
    return this;
  }

  public setMonth(month: number): DateTime {
    this.time.month(month);
    return this;
  }

  public setDay(day: number): DateTime {
    this.time.date(day);
    return this;
  }

  public setHour(hour: number): DateTime {
    this.time.hour(hour);
    return this;
  }

  public setMinute(minute: number): DateTime {
    this.time.minute(minute);
    return this;
  }

  public setSecond(second: number): DateTime {
    this.time.second(second);
    return this;
  }
  //#endregion

  //#region Manipulate
  public add(value: number | moment.Duration, type?: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds') {
    if (type != null) {
      this.time.add(value, type);
    } else {
      this.time.add(value);
    }
    return this;
  }

  public subtract(value: number | moment.Duration, type?: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds') {
    if (type != null) {
      this.time.subtract(value, type);
    } else {
      this.time.subtract(value);
    }
    return this;
  }

  public clone() {
    return new DateTime(this.toString());
  }

  public isBefore(date: DateTime): boolean {
    return this.time.isBefore(date.time);
  }

  public adjustMinutesToClosestMultipleInteger(multiple: number): DateTime {
    const minute = this.time.minute();
    const minuteAdjustedForPicker = minute - (minute % multiple);
    this.time.minute(minuteAdjustedForPicker);
    return this;
  }
  //#endregion

  //#region Display
  public toString(format: string = 'YYYY-MM-DDTHH:mm:ss.SSSZ'): string {
    return this.time.format(format);
  }

  public getDifference(dateTime: DateTime, format?: string): string {
    const diff = this.time.diff(dateTime.time);
    return moment.utc(diff).format(format);
  }

  public getTimeDifference(dateTime: DateTime, type: 'years' | 'months' | 'days' | 'hours' | 'minutes' | 'seconds'): number {
    const diff = this.time.diff(dateTime.time, type, true);
    return diff;
  }

  public inMilliseconds(): number {
    return this.time.valueOf();
  }

  public toDateObject(): Date {
    return new Date(this.inMilliseconds());
  }
  //#endregion
}
