import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Trip} from '@shared/models/trip.model';
import {TripsService} from '@shared/services/trips.service';
// declare const moment: any;
import * as moment from 'moment';

// const Moment: any = (<any>moment).default || moment;

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  trips: Trip[];
  isLoaded = false;

  constructor(
    private _trips: TripsService,
  ) {
  }

  ngOnInit() {
    this.subscription = this._trips.getTrips()
                            .subscribe((data) => {
                              this.trips = data['trips'];
                              this.isLoaded = true;
                            }, error => {

                            });
  }


  dateHappened(date = '', addDay: number = 0) {
    return moment(date).add(addDay, 'd').isBefore();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
