import {Component, Input, OnInit} from '@angular/core';
import {Route} from '../../models/route.model';
import * as moment from 'moment';

@Component({
  selector: 'autotourism-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {

  @Input() route: Route;

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
