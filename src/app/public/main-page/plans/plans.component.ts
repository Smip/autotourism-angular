import {Component, Input, OnInit} from '@angular/core';
import {Trip} from "../../../shared/models/trip.model";
import * as moment from 'moment';

@Component({
  selector: 'autotourism-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  @Input() trips;

  constructor() { }

  ngOnInit() {

    this.trips = this.trips.filter((trip: Trip) =>{
      return !this.dateHappened(trip.registration_open_to, 1) && (trip.type === "real" || trip.type === "plan");
    }).sort((trip1: Trip, trip2: Trip) =>{
      if(trip1.date_from > trip2.date_from){
        return 1;
      }else {
        return -1;
      }
    });
  }

  dateHappened(date = '', addDay:number = 0) {
    return moment(date).add(addDay, 'd').isBefore();
  }

  numberInArray(value:number, array:Array<number>){
    return array.indexOf(+value) === -1 ? false : true;
  }

}
