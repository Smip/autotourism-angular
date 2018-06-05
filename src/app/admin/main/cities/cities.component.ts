import {Component, OnInit} from '@angular/core';
import {ChatsService} from '../../../shared/services/chats.service';

@Component({
  selector: 'autotourism-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';
  public doughnutChartLegend = false;
  isLoaded = false;

  constructor(
    private chartsServise: ChatsService
  ) { }

  ngOnInit(): void {
    this.chartsServise.getCities()
      .subscribe((response) => {
        const data = response['response'];
        this.doughnutChartLabels = data.map((el) => {
          return el.city;
        });
        this.doughnutChartData = data.map((el) => {
            return el.number;
          });

        this.isLoaded = true;
      });
  }

}
