import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from './base-api';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AdminTripsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getTrips(): Observable<any> {
    return this.get('admin/trips');
  }

  getTrip(id: number, data = {}): Observable<any> {
    return this.get('admin/trips/' + id, data);
  }

  addTrip(data): Observable<any> {
    return this.post('admin/trips', data);
  }

  editTrip(id: number, data): Observable<any> {
    return this.put('admin/trips/' + id, data);
  }

  editRoute(id: number, data): Observable<any> {
    return this.put(`admin/trips/${id}/route`, data);
  }


  editMembers(id: number, data): Observable<boolean> {
    return this.put(`admin/trips/${id}/members`, data);
  }

  editReport(id: number, data): Observable<boolean> {
    return this.put(`admin/trips/${id}/report`, data);
  }

}
