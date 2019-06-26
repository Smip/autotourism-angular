import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BaseApi} from './base-api';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UsersService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUsers(): Observable<any> {
    return this.get('admin/users');
  }

  getUser(id: number): Observable<any> {
    return this.get(`admin/users/${id}`);
  }

  editUser(id: number, data: {}): Observable<any> {
    return this.post(`admin/users/${id}`, data);
  }

  addUser(data: {}): Observable<any> {
    return this.put(`admin/users`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.delete(`admin/users/${id}`);
  }


}
