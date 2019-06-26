import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TripsService} from '@shared/services/trips.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Trip} from '@shared/models/trip.model';
import {TranslateService} from '@ngx-translate/core';
import {MetaService} from '@ngx-meta/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  id: string;
  // report: Report;
  article = [];
  trip: Trip;
  isLoaded = false;

  constructor(
    private _route: ActivatedRoute,
    private _trips: TripsService,
    private _router: Router,
    private _translate: TranslateService,
    private readonly _meta: MetaService,
  ) {
  }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.subscription = this._trips.getTripAndReport(+this.id)
                            .subscribe((response) => {
                              this.trip = response.trip;
                              this.setMeta();
                              this.isLoaded = true;
                            }, error => {
                              this._router.navigateByUrl('404', {skipLocationChange: true});
                            });
  }

  setMeta() {
    const title = this._translate.instant('Отчёт о пробеге') + ' ' +
      (this.trip.number ? '№' + this.trip.number : '') + ' ' + this.trip.name;
    this._meta.setTitle(title);
    this._meta.setTag('description', this.trip.report.article.replace(/<(?:.|\n)*?>/gm, '').replace(/\s+/g, ' ').trim().slice(0, 120));
    this._meta.setTag('og:title', title);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
