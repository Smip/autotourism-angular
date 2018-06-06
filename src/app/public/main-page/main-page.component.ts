import {Component, OnDestroy, OnInit} from '@angular/core';
import {Trip} from '../../shared/models/trip.model';
import {TripsService} from '../../shared/services/trips.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'autotourism-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  trips: [Trip];

  isLoaded = false;
  constructor(
    private tripService: TripsService
  ) { }

  ngOnInit() {
    this.subscription = this.tripService.getTrips()
      .subscribe((data) => {
        this.trips = data['response'];
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
