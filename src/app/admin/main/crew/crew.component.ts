import {Component, OnInit} from '@angular/core';
import {ChatsService} from "../../../shared/services/chats.service";

@Component({
  selector: 'autotourism-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class CrewComponent implements OnInit {
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales:{
      "yAxes":[
        {"ticks":{"beginAtZero":true}}
      ]
    },
    tooltips: {
      callbacks: {
        afterBody: function(t, d) {
          console.log(t[0].index, this);
          return "+";
          // return 'margin ' + this.data[t[0].index]['name'];
        }
      }
    }
  };

  public barChartLabels:string[];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [];

  public data;
  isLoaded = false;

  constructor(
    private chartsServise: ChatsService
  ) {}

  ngOnInit(): void {
    this.chartsServise.getMembers()
      .subscribe((response)=> {
        this.data = response['response'];
        this.barChartLabels = this.data.map((el)=>{
          return "Пробег "+el.number;
        });
        this.barChartData.push({
          data:this.data.map((el)=>{
            return el.members;
          }),
          label: "Экипажей"
        });
        this.isLoaded = true;
      });
  }

  public chartClicked(e:any):void {
    console.log(e);
  }

}
