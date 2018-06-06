import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../../shared/models/trip.model';
import * as moment from 'moment';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'autotourism-current-trip',
  templateUrl: './current-trip.component.html',
  styleUrls: ['./current-trip.component.scss']
})
export class CurrentTripComponent implements OnInit {
  @Input() trips: Trip[];
  trip: Trip;
  trips1: Trip[];
  trips2: Trip[];
  time_to_trip = '';


  constructor(private translate: TranslateService) { }

  ngOnInit() {
    moment.locale(this.translate.currentLang);
     this.trips = this.trips.filter((trip) => {
      return trip.type === 'real';
     });

    if (this.trips.length > 0) {
      this.trips1 = Object.assign({}, this.trips.sort((trip1: Trip, trip2: Trip) => {
        const diff1 = moment().startOf('day').diff(moment(trip1.date_until), 'days');
        const diff2 = moment().startOf('day').diff(moment(trip2.date_until), 'days');
        if (diff1 >= 0 &&  diff2 < 0) {
          return  -1;
        } else if (diff1 >= 0 && diff2 >= 0) {
          return diff1 - diff2;
        } else {
          return 1;
        }

      }));

      this.trips2 = Object.assign({}, this.trips.sort((trip1: Trip, trip2: Trip) => {
        const diff1 = moment().startOf('day').diff(moment(trip1.date_from), 'days');
        const diff2 = moment().startOf('day').diff(moment(trip2.date_from), 'days');
        if (diff1 <= 0 &&  diff2 >= 0) {
          return  -1;
        } else if (diff1 <= 0 && diff2 <= 0) {
          return diff2 - diff1;
        } else {
          return 1;
        }
      }));

      if (moment().startOf('day').diff(this.trips1[0].date_until, 'days') < 7) {
        this.trip = this.trips1[0];
      } else {
        this.trip = this.trips2[0];
      }

      if (this.dateHappened(this.trip.date_until, 1)) {
        this.time_to_trip = moment(this.trip.date_until).fromNow().toString();
      } else {
        this.time_to_trip = moment(this.trip.date_from).fromNow().toString();
      }
    }
  }

  dateHappened(date = '', addDay: number = 0) {
    return moment(date).add(addDay, 'd').isBefore();
  }



}
