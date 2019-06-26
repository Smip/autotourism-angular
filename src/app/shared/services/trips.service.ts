import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from './base-api';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TripsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getTrips(): Observable<any> {
    return this.get('trips');
  }

  getTripAndReport(id: number): Observable<any> {
    return this.get(`trips/${id}/report`);
  }


  getPlans(): Observable<any> {
    return this.get('plans');
  }

  getCurrentTrip(): Observable<any> {
    return this.get('trips/current');
  }

  getLastTrips(): Observable<any> {
    return this.get('trips/last');
  }


  getTrip(id: number): Observable<any> {
    return this.get('trips/' + id);
  }

  addTrip(data): Observable<any> {
    return this.post('trips', data);
  }

  editTrip(id: number, data): Observable<any> {
    return this.put('trips/' + id, data);
  }

  editRoute(id: number, data): Observable<any> {
    return this.post('route/' + id, data);
  }


}
