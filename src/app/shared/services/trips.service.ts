import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Trip} from '../models/trip.model';
import {BaseApi} from '../core/base-api';
import {Route} from '../models/route.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TripsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getTrips(): Observable<Trip[]> {
    return this.get('trips');
  }

  getTrip(id: number): Observable<Trip> {
    return this.get('trip/' + id);
  }

  addTrip(data: Trip): Observable<number> {
    return this.post('trip', data);
  }

  editTrip(id: number, data: Trip): Observable<boolean> {
    return this.put('trip/' + id, data);
  }

  editRoute(id: number, data: [Route]): Observable<boolean> {
    return this.post('route/' + id, data);
  }


}
