import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ChatsService extends BaseApi {

  constructor(public http: HttpClient){
    super(http);
  }

  getMembers(): Observable<any[]> {
    return this.get('chart/members');
  }

  getCars(): Observable<any[]> {
    return this.get('chart/cars');
  }

  getCities(): Observable<any[]> {
    return this.get('chart/city');
  }


}
