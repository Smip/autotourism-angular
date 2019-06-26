import {Component, Input, OnInit} from '@angular/core';
import {Route} from '../../models/route.model';
// declare const moment: any;
import * as moment from 'moment';

// const Moment: any = (<any>moment).default || moment;

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {

  @Input() route: Route[];

  constructor() { }

  ngOnInit() {
  }

  isValidDate(value: string) {
    return moment(value).isValid() && value;
  }


  dateBetween(date1: string = '', date2: string = '') {
    return moment().startOf('day').isBetween(date1, date2, null, '[]');
  }
}
