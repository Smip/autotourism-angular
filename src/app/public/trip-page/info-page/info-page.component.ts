import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import {TripsService} from '../../../shared/services/trips.service';
import {ActivatedRoute} from '@angular/router';
import {Trip} from '../../../shared/models/trip.model';
import * as moment from 'moment';

@Component({
  selector: 'autotourism-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  trip: Trip;
  id: string;

  isLoaded = false;
  constructor(private tripService: TripsService, private route: ActivatedRoute) {
    this.id = route.snapshot.parent.params['id'];
  }

  ngOnInit() {
    this.subscription = this.tripService.getTrip(+this.id)
      .subscribe((data) => {
        this.trip = data['response'];
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

  dateHappened(date = '', addDay: number = 0) {
    return moment(date).add(addDay, 'd').isBefore();
  }

}
