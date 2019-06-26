import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Trip} from '@shared/models/trip.model';
import {TripsService} from '@shared/services/trips.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MetaService} from '@ngx-meta/core';
import {TranslateService} from '@ngx-translate/core';
// declare const moment: any;
import * as moment from 'moment';

// const Moment: any = (<any>moment).default || moment;

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  trip: Trip;
  isLoaded = false;
  id: number;
  mTabs;

  constructor(
    private _trips: TripsService,
    private route: ActivatedRoute,
    private readonly _meta: MetaService,
    private _translate: TranslateService,
    private _router: Router,
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.subscription = this._trips.getTrip(this.id)
                            .subscribe((data) => {
                              this.trip = data['trip'];
                              this.setMeta();
                              this.isLoaded = true;
                            }, error => {
                              this._router.navigateByUrl('404', {skipLocationChange: true});
                            });
  }

  setMeta() {
    const title = this._translate.instant('Информация о пробеге') + ' ' +
      (this.trip.number ? '№' + this.trip.number : '') + ' ' + this.trip.name;
    this._meta.setTitle(title);
    this._meta.setTag('description', this._translate.instant('Пробег') + ' ' +
      this.trip.name + ', ' + this.trip.date_from + ' - ' + this.trip.date_until + ' ' +
      this._translate.instant('В пробеге участвовало экипажей:') +
      this.trip.members.length);
    this._meta.setTag('og:title', title);
  }

  dateHappened(date = '', addDay: number = 0) {
    if (!date) {
      return true;
    }
    return moment(date).add(addDay, 'd').isBefore();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
