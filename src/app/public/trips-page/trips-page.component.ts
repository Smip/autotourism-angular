import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Rx";
import {Trip} from "../../shared/models/trip.model";
import {TripsService} from "../../shared/services/trips.service";
import * as moment from 'moment';


@Component({
  selector: 'autotourism-trips-page',
  templateUrl: './trips-page.component.html',
  styleUrls: ['./trips-page.component.scss']
})
export class TripsPageComponent implements OnInit, OnDestroy {

  itemsOnPage:number = 10;
  currentPage:number = 1;
  maxPage:number;

  subscription: Subscription;

  trips: Trip[];

  isLoaded = false;
  constructor(private tripService: TripsService) { }

  ngOnInit() {
    moment.locale('ru');
    this.subscription = this.tripService.getTrips()
      .subscribe((data)=> {
        this.trips = data['response'];
        this.trips = this.trips.sort((trip1: Trip, trip2: Trip) =>{
          if(trip1.date_from > trip2.date_from){
            return -1;
          }else {
            return 1;
          }
        });
        this.maxPage = Math.round(this.trips.length/this.itemsOnPage);
        this.isLoaded = true;
      });
  }

  nextPage() {
    this.currentPage++;
  }

  prevPage() {
    this.currentPage--;
  }

  dateHappened(date = '', addDay:number = 0) {
    return moment(date).add(addDay, 'd').isBefore();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
