import {Component, Input, OnInit} from '@angular/core';

import {Trip} from '../../../shared/models/trip.model';
import * as moment from 'moment';

@Component({
  selector: 'autotourism-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit {
  @Input() trips;

  itemsOnPage:number = 4;
  currentPage:number = 1;
  maxPage:number;
  currentTrip:Trip;

  constructor() { }

  ngOnInit() {
    this.trips = this.trips.filter((trip: Trip) =>{
      return trip.type === 'real' && this.dateHappened(trip.date_until);
    }).sort((trip1: Trip, trip2: Trip) =>{
      if(trip1.date_from > trip2.date_from){
        return -1;
      }else {
        return 1;
      }
    });
    this.currentTrip = this.trips[0];
    this.maxPage = Math.round(this.trips.length/this.itemsOnPage);
  }

  nextPage() {
    this.currentPage++;
  }

  prevPage() {
    this.currentPage--;
  }

  showTripDetails(trip:Trip){
    this.currentTrip = trip;
  }

  dateHappened(date = '', addDay:number = 0) {
    return moment(date).add(addDay, 'd').isBefore();
  }



}
