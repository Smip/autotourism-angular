import {Component, OnInit} from '@angular/core';


import {AdminTripsService} from '@shared/services/admin-trips.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Trip} from '@shared/models/trip.model';

import {FormBuilder, FormGroup} from '@angular/forms';
import {Report} from '@shared/models/report.model';
import {toast} from '@smip/ngx-materialize';
import {QuillService} from '@shared/quill/quill.service';


@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss'],
})
export class EditReportComponent implements OnInit {


  subscription: Subscription;
  subscription2: Subscription;
  id: number;
  isLoaded = false;
  trip: Trip;
  modules;
  form: FormGroup;
  formats = [
    'bold',
    'italic',
    'link',
    'underline',
    'blockquote',
    'header',
    'indent',
    'list',
    'image'];

  constructor(
    private _trips: AdminTripsService,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _quill: QuillService,
  ) {
  }

  ngOnInit() {
    this.modules = this._quill.modules();
    this.id = this._route.snapshot.params['id'];
    this.subscription = this._trips.getTrip(+this.id, {report: 1}).subscribe(response => {
      this.trip = response['trip'];
      this.form = this.getForm(this.trip.report ? this.trip.report : new Report());
      this.isLoaded = true;
    });
  }

  addBindingCreated(event) {
    const toolbar = event.getModule('toolbar');
    toolbar.quill.theme.tooltip.textbox.className = 'browser-default';
    toolbar.quill.theme.tooltip.textbox.dataset.link = 'Вставьте ссылку и нажмите Enter';
  }

  getForm(report: Report = new Report()) {
    return this._formBuilder.group({
        'article': [report.article],
        'posted': [report.posted],
      },
    );
  }

  onSubmit() {
    const report = this.form.value;
    if (report.article) {
      report.article = report.article.replace(/\t/g, ' ');
      report.article = report.article.replace(/\s+/g, ' ');
      report.article = report.article.replace(/<p><br><\/p>/g, '');
    }
    this.subscription2 = this._trips.editReport(+this.id, report)
                             .subscribe((data) => {
                               toast({html: 'Сохранено'});
                             });
  }

}
