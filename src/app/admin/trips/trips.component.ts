import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Trip} from '../../shared/models/trip.model';
import {TripsService} from '../../shared/services/trips.service';

@Component({
  selector: 'autotourism-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  trips: [Trip];

  itemsOnPage = 10;
  currentPage = 1;
  totalItems = 0;

  isLoaded = false;


  constructor(private tripService: TripsService) { }

  ngOnInit() {
    this.subscription = this.tripService.getTrips()
      .subscribe((data) => {
        this.trips = data['response'];
        this.trips =  this.trips.sort((trip1: Trip, trip2: Trip) => {
          if (trip1.date_from > trip2.date_from) {
            return -1;
          } else {
            return 1;
          }
        });
        this.totalItems = this.trips.length;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

  goToPage(n: number): void {
    this.currentPage = n;
  }

  onNext(): void {
    this.currentPage++;
  }

  onPrev(): void {
    this.currentPage--;
  }
}
