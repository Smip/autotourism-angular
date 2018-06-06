import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatsService} from '../../../shared/services/chats.service';
import {TranslateService} from '@ngx-translate/core';
import {forkJoin} from 'rxjs/index';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'autotourism-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit, OnDestroy {


  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = false;
  isLoaded = false;
  subscription: Subscription;

  constructor(
    private chartsServise: ChatsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.subscription = forkJoin([this.chartsServise.getCities(), this.translate.getTranslation(this.translate.currentLang)])
      .subscribe((res) => {
        const data = res[0]['response'];
        this.doughnutChartLabels = data.map((el) => {
          return el.city in res[1] ? res[1][el.city] : el.city;
        });
        this.doughnutChartData = data.map((el) => {
            return el.number;
          });

        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
