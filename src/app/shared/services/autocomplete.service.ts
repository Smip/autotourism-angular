import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BaseApi} from '../core/base-api';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class AutocompleteService extends BaseApi {


  constructor(public http: HttpClient) {
    super(http);
  }

  getCountries(): Observable<any[]> {
    return this.get('autocomplete/country');
  }

  getNicks(): Observable<any[]> {
    return this.get('autocomplete/nick');
  }

  getAutous(): Observable<any[]> {
    return this.get('autocomplete/auto');
  }

  getCities(): Observable<any[]> {
    return this.get('autocomplete/city');
  }

}
