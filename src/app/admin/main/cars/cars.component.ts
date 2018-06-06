import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatsService} from '../../../shared/services/chats.service';
import {Subscription} from 'rxjs/Subscription';
import {forkJoin} from 'rxjs/index';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'autotourism-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit, OnDestroy {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    responsive: true,
    'scales': {
      'yAxes': [
        {'ticks': {'beginAtZero': true}}
      ]
    }
  };
  public barChartLabels: string[];
  public barChartType = 'horizontalBar';
  public barChartLegend = true;

  public barChartData: any[] = [];
  subscription: Subscription;
  isLoaded = false;

  constructor(
    private chartsServise: ChatsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.subscription = forkJoin([this.chartsServise.getCars(), this.translate.get(['Количество участий в пробегах'])])
      .subscribe((res) => {
      console.log(res);
        const data = res[0]['response'];
        this.barChartLabels = data.map((el) => {
          return el.auto;
        });
        this.barChartData.push({
          data: data.map((el) => {
            return el.number;
          }),
          label: res[1]['Количество участий в пробегах']
        });
        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
