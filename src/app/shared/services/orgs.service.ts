import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from './base-api';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OrgsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getOrgs(): Observable<any> {
    return this.get('orgs');
  }

  getOrg(id: number): Observable<any> {
    return this.get('admin/orgs/' + id);
  }

  addOrg(data): Observable<any> {
    return this.post('admin/orgs', data);
  }

  editOrg(id: number, data): Observable<any> {
    return this.put('admin/orgs/' + id, data);
  }

  deleteOrg(id: number): Observable<any> {
    return this.delete('admin/orgs/' + id);
  }

}
