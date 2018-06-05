import {Component, OnInit} from '@angular/core';
import {ChatsService} from '../../../shared/services/chats.service';

@Component({
  selector: 'autotourism-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
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
  isLoaded = false;

  constructor(
    private chartsServise: ChatsService
  ) {}

  ngOnInit(): void {
    this.chartsServise.getCars()
      .subscribe((response) => {
        const data = response['response'];
        this.barChartLabels = data.map((el) => {
          return el.auto;
        });
        this.barChartData.push({
          data: data.map((el) => {
            return el.number;
          }),
          label: 'Количество участий в пробегах'
        });
        this.isLoaded = true;
      });
  }

}
