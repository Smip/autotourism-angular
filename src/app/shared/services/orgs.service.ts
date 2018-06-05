import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {BaseApi} from '../core/base-api';
import {Org} from "../models/org.model";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class OrgsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getOrgs(): Observable<Org[]> {
    return this.get('orgs');
  }

  getOrg(id: number): Observable<Org> {
    return this.get('org/' + id);
  }

  editOrg(id: number, data: Org): Observable<Org> {
    return this.put('org/' + id, data);
  }

  addOrg(data: Org): Observable<Org> {
    return this.post('org', data);
  }

  deleteOrg(id: number): Observable<Org> {
    return this.delete('org/' + id);
  }


}
