import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseApi} from '../core/base-api';
import {About} from '../models/about.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AboutService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAbout(): Observable<About> {
    return this.get('about');
  }

  editAbout(data: About): Observable<About> {
    return this.put('about', data);
  }


}
