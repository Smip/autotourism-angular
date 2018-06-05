import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

import {BaseApi} from '../core/base-api';
import {Member} from '../models/member.model';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export class MembersService extends BaseApi {

  constructor(public http: HttpClient,
              private router: Router) {
    super(http);
  }

  getMembers(id: number): Observable<Member[]> {
    return this.get('members/' + id).map(response => {
      if (response['error_code'] && response['error_code'] == 403) {
        this.router.navigate(['/auth'], {
          queryParams: {
            accessDenied: true
          }
        });
        return false;
      }
      return response;
    });
  }

  editMembers(id: number, data: [Member]): Observable<boolean> {
    return this.post('members/' + id, data);
  }


}
