import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BaseApi} from '@shared/services/base-api';


@Injectable()
export class AutocompleteService extends BaseApi {


  constructor(public http: HttpClient) {
    super(http);
  }

  getCountries(): Observable<any> {
    return this.get('admin/autocomplete/country');
  }

  getNicks(): Observable<any[]> {
    return this.get('admin/autocomplete/nicknames');
  }

  getAutous(): Observable<any[]> {
    return this.get('admin/autocomplete/cars');
  }

  getCities(): Observable<any[]> {
    return this.get('admin/autocomplete/city');
  }

}
