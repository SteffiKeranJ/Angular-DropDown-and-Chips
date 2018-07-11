import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { NgxSpinnerService } from 'ngx-spinner';

const now = new Date();
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  model: NgbDateStruct;
  date: {year: number, month: number};
  displayMonths = 2;
  item: {[x: string]: any} = {};
  arrayList = ['steffi', 'keran', 'rani'];
  arrayList2 = [];
  display = 'block';
  navigation = 'select';
  showWeekNumbers = false;
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  apiroot: string="http://httpbin.org";
  constructor(
    private calendar: NgbCalendar,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
  ) {
    this.fromDate = calendar.getToday();
    // this.toDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }
  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }
  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  selectToday(){
    this.toDate = {year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate()};
    this.fromDate = {year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate()};
  }

  selectYesterday() {
    this.toDate = {year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate()-1};
    this.fromDate = {year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate()-1};
  }

  selectLastMonthThisDay() {
    this.toDate = {year: now.getFullYear(), month: now.getMonth(), day: now.getDate()};
    this.fromDate = {year: now.getFullYear(), month: now.getMonth(), day: now.getDate()};
  }

  selectLastSevenDays() {
    this.toDate = {year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate()-7};
    this.fromDate = {year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate()};
  }
  selectLastThirtyDays() {
    this.toDate = {year: now.getFullYear(), month: now.getMonth()+1, day: now.getDate()};
    this.fromDate = {year: now.getFullYear(), month: now.getMonth(), day: now.getDate()};
  }

  selectThisMonth() {
    this.toDate = {year: now.getFullYear(), month: now.getMonth()+1, day: new Date(now.getFullYear(), now.getMonth()+1, 0).getDate()};
    this.fromDate = {year: now.getFullYear(), month: now.getMonth()+1, day: 1};
  }

  selectLastMonth() {
    this.toDate = {year: now.getFullYear(), month: now.getMonth(), day: new Date(now.getFullYear(), now.getMonth()+1, 0).getDate()};
    this.fromDate = {year: now.getFullYear(), month: now.getMonth(), day: 1};
  }

  toggleShow() {
    let elem = <HTMLElement>document.querySelector('ngb-datepicker');
    if(elem.style.display == 'inline-block'){
      elem.style.display="none";
    }
    else {
      elem.style.display = "inline-block";
    }
  }
  apply() {
    console.log("GET");
    let url = `${this.apiroot}/get`;
    this.httpClient.get(url).subscribe(res => console.log(res));
  }
  close(item:any) {
    let index = this.arrayList2.indexOf(item);
    if ( index !== -1) {
      this.arrayList2.splice(index, 1);
    }
  }
  add(item:any) {
    this.display = 'block';
    if(this.arrayList2.indexOf(item) === -1){
    this.arrayList2.push(item);
  }
}

}
