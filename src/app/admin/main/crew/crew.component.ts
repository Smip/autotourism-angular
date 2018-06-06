import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatsService} from '../../../shared/services/chats.service';
import {TranslateService} from '@ngx-translate/core';
import {forkJoin} from 'rxjs/index';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'autotourism-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class CrewComponent implements OnInit, OnDestroy {

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      'yAxes': [
        {'ticks': {'beginAtZero': true}}
      ]
    },
    tooltips: {
      callbacks: {
        afterBody: function(t, d) {
          return '+';
        }
      }
    }
  };

  subscription: Subscription;

  public barChartLabels: string[];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [];

  public data;
  isLoaded = false;

  constructor(
    private chartsServise: ChatsService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.subscription = forkJoin([this.chartsServise.getMembers(), this.translate.get(['Экипажей', 'Пробег'])])
      .subscribe((res) => {
        this.data = res[0]['response'];
        this.barChartLabels = this.data.map((el) => {
          return res[1]['Пробег'] + ' ' + el.number;
        });
        this.barChartData.push({
          data: this.data.map((el) => {
            return el.members;
          }),
          label: res[1]['Экипажей']
        });
        this.isLoaded = true;
      });

  }
  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
