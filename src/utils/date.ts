import { DateString } from "../store/selectedDate/slice";

export class FormatDate {
  date: Date;
  constructor(date: DateString) {
    this.date = new Date(date);
  }
  getYear(): string {
    return this.date.getFullYear().toString();
  }
  getMonth(): string {
    const month = this.date.getMonth() + 1;
    return month.toString().padStart(2, "0");
  }
  getDay(): string {
    return this.date.getDate().toString().padStart(2, "0");
  }
  getFullFormatedDate(divider: string): string {
    return `${this.getYear()}${divider}${this.getMonth()}${divider}${this.getDay()}`;
  }
}

export function getDateLists(fromDate: Date, toDate: Date) {
  const dateLists: DateString[] = [];

  for (let m = toDate.getMonth(); m >= 0; m--) {
    dateLists.push(new Date(toDate.getFullYear(), m).toString());
  }

  for (let y = toDate.getFullYear() - 1; y >= fromDate.getFullYear(); y--) {
    for (let m = 11; m >= 0; m--) {
      dateLists.push(new Date(y, m).toString());
    }
  }

  return dateLists;
}

export function isSameYearAndMonth(date1: DateString, date2: DateString) {
  const targetDate = new Date(date1);
  const compareDate = new Date(date2);
  return (
    targetDate.getFullYear() === compareDate.getFullYear() &&
    targetDate.getMonth() === compareDate.getMonth()
  );
}
