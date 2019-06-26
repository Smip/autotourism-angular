import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Trip} from '@shared/models/trip.model';
import {TripsService} from '@shared/services/trips.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-last-trips',
  templateUrl: './last-trips.component.html',
  styleUrls: ['./last-trips.component.scss'],
})
export class LastTripsComponent implements OnInit {
  subscription: Subscription;
  trips: Trip[];
  selectedTrip: Trip;
  isLoaded = false;

  constructor(private _trips: TripsService,
              private _router: Router) {
  }

  ngOnInit() {
    this.subscription = this._trips.getLastTrips().subscribe(response => {
      this.trips = response.trips;
      this.selectedTrip = this.trips[0];
      this.isLoaded = true;
    }, error => {
    });
  }

  showTripDetails(trip) {
    if (window.innerWidth > 600) {
      this.selectedTrip = trip;
    } else {
      this._router.navigate(['/trips', trip.id]);
    }
  }

}
