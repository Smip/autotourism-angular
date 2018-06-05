import {Component, OnDestroy, OnInit} from '@angular/core';
import {Report} from "../../../shared/models/report.model";
import {ReportsService} from "../../../shared/services/reports.service";
import {Subscription} from "rxjs/Rx";
import {ActivatedRoute} from "@angular/router";


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

  isLoaded = false;
  constructor(private reportsService: ReportsService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id']
  }


  ngOnInit() {
    this.subscription = this.reportsService.getReport(+this.id)
      .subscribe((data)=> {
        const doc = document.createElement("div");
        doc.innerHTML = data['response']['article'];
        Array.from(doc.childNodes).forEach((el) => {
          // console.log(el.firstChild, el, el.firstChild.nodeName);
          if(el.firstChild.nodeType === 3 ){
            if(this.article.length === 0 || this.article[this.article.length - 1]['type'] != 'text'){
              this.article.push({'type':'text', 'contents':[]});
            }
            this.article[this.article.length - 1]['contents'].push((<HTMLElement>el).innerHTML);
          }else if(el.firstChild.nodeName === "IMG"){
            if(this.article.length === 0 || this.article[this.article.length - 1]['type'] != 'img'){
              this.article.push({'type':'img', 'contents':[]});
            }
            Array.from(el.childNodes).forEach((el_c) => {
              this.article[this.article.length - 1]['contents'].push(el_c);
            });

          }
        });
        console.log(this.article);
        this.report = data['response'];
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
