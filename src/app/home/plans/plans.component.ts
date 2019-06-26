import {Component, OnInit} from '@angular/core';
import {TripsService} from '@shared/services/trips.service';
import {Trip} from '@shared/models/trip.model';
import {Subscription} from 'rxjs';
// declare const moment: any
import * as moment from 'moment';

// const Moment: any = (<any>moment).default || moment;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent implements OnInit {
  subscription: Subscription;
  plans: Trip[];
  isLoaded = false;

  constructor(private _trips: TripsService) {
  }

  ngOnInit() {
    this.subscription = this._trips.getPlans().subscribe(response => {
      this.plans = response.plans;
      this.isLoaded = true;
    }, error => {
    });
  }

  dateHappened(date = '', addDay: number = 0) {
    if (!date) {
      return true;
    }
    return moment(date).add(addDay, 'd').isBefore();
  }

}
