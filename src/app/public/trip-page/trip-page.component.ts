import {Component, OnDestroy, OnInit} from '@angular/core';
import {TripsService} from '../../shared/services/trips.service';
import {Trip} from '../../shared/models/trip.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'autotourism-trip-page',
  templateUrl: './trip-page.component.html',
  styleUrls: ['./trip-page.component.scss']
})
export class TripPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  trip: Trip;
  id: string;

  isLoaded = false;
  constructor(
    private tripService: TripsService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    title.setTitle('Информация о пробеге');
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.subscription = this.tripService.getTrip(+this.id)
      .subscribe((data) => {
        this.trip = data['response'];
        this.title.setTitle('Информация о пробеге ' + this.trip.name);
        this.isLoaded = true;
      });

    if (!this.route.snapshot.firstChild) {
      this.router.navigate(['info'], {relativeTo: this.route});
    }

  }

  dateHappened(date = '', addDay: number = 0) {
    return moment(date).add(addDay, 'd').isBefore();
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }


}
