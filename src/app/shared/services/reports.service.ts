import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {BaseApi} from '@shared/services/base-api';

@Injectable()
export class ReportsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getReport(id: number): Observable<any> {
    return this.get('report/' + id);
  }


}
