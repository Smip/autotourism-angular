import {Component, Input, OnInit} from '@angular/core';

import {Trip} from '../../../../shared/models/trip.model';
import * as moment from 'moment';

@Component({
  selector: 'autotourism-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {
  @Input() trip:Trip;

  constructor() { }

  ngOnInit() {
    moment.locale('ru')
  }


  dateHappened(date = '', addDay:number = 0) {
    return moment(date).add(addDay, 'd').isBefore();
  }


}
