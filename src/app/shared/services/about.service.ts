import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from './base-api';
import {HttpClient} from '@angular/common/http';
import {About} from '@shared/models/about.model';

@Injectable()
export class AboutService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAbout(): Observable<any> {
    return this.get('about');
  }

  editAbout(data: About): Observable<any> {
    return this.put('admin/about', data);
  }

}
