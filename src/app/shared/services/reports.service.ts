import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {BaseApi} from '../core/base-api';
import {Report} from '../models/report.model';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ReportsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getReport(id: number): Observable<Report> {
    return this.get('report/' + id);
  }

  editReport(id: number, data: Report): Observable<boolean> {
    return this.put('report/' + id, data);
  }


}
