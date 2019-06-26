import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Trip} from '@shared/models/trip.model';
import {TripsService} from '@shared/services/trips.service';
// declare const moment: any;
import * as moment from 'moment';

// const Moment: any = (<any>moment).default || moment;

@Component({
  selector: 'app-current-trip',
  templateUrl: './current-trip.component.html',
  styleUrls: ['./current-trip.component.scss'],
})
export class CurrentTripComponent implements OnInit {
  subscription: Subscription;
  trip: Trip;
  isLoaded = false;

  constructor(private _trips: TripsService) {
  }

  ngOnInit() {
    this.subscription = this._trips.getCurrentTrip().subscribe(response => {
      this.trip = response.trip;
      this.isLoaded = true;
    }, error => {
    });
  }

  dateHappened(date = '', addDay: number = 0) {
    return moment(date).add(addDay, 'd').isBefore();
  }

}
