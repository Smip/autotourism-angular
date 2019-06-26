import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminTripsService} from '@shared/services/admin-trips.service';
import {Subscription} from 'rxjs';
import {Trip} from '@shared/models/trip.model';

@Component({
  selector: 'app-admin-trips',
  templateUrl: './admin-trips.component.html',
  styleUrls: ['./admin-trips.component.scss'],
})
export class AdminTripsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  trips: Trip[];
  isLoaded = false;

  constructor(private _trips: AdminTripsService) {
  }

  ngOnInit() {
    this.subscription = this._trips.getTrips()
                            .subscribe((data) => {
                              this.trips = data['trips'];
                              this.isLoaded = true;
                            });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
