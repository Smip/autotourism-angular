import {Component, OnDestroy, OnInit} from '@angular/core';
import {Report} from '../../../shared/models/report.model';
import {ReportsService} from '../../../shared/services/reports.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {forkJoin} from 'rxjs/index';
import {Trip} from '../../../shared/models/trip.model';
import {TripsService} from '../../../shared/services/trips.service';


@Component({
  selector: 'autotourism-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  id: string;
  report: Report;
  article = [];
  trip: Trip;

  isLoaded = false;
  constructor(
    private reportsService: ReportsService,
    private route: ActivatedRoute,
    private tripService: TripsService,
    private title: Title
  ) {
    this.id = this.route.snapshot.params['id'];
    title.setTitle('Отчёт о пробеге');
  }


  ngOnInit() {
    this.subscription = forkJoin([this.reportsService.getReport(+this.id), this.tripService.getTrip(+this.id)])
      .subscribe((results) => {
        const data = results[0];
        this.trip = results[1]['response'];
        this.title.setTitle('Отчёт о пробеге ' + this.trip.name);
        const doc = document.createElement('div');
        doc.innerHTML = data['response']['article'];
        Array.from(doc.childNodes).forEach((el) => {
          if (el.firstChild.nodeType === 3 ) {
            if (this.article.length === 0 || this.article[this.article.length - 1]['type'] !== 'text') {
              this.article.push({'type': 'text', 'contents': []});
            }
            this.article[this.article.length - 1]['contents'].push((<HTMLElement>el).innerHTML);
          } else if (el.firstChild.nodeName === 'IMG') {
            if (this.article.length === 0 || this.article[this.article.length - 1]['type'] !== 'img') {
              this.article.push({'type': 'img', 'contents': []});
            }
            Array.from(el.childNodes).forEach((el_c) => {
              this.article[this.article.length - 1]['contents'].push(el_c);
            });
          }
        });
        this.report = data['response'];
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
