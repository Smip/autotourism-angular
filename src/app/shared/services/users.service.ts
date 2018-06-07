import {Injectable} from '@angular/core';
import {BaseApi} from '../core/base-api';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class UsersService extends BaseApi {

  constructor(
    public http: HttpClient,
    public auth: AuthService
  ) {
    super(http);
  }

  login(username: string, password: string) {
    return this.post('user', {username: username, password: password})
      .map(user => {
            if (user['response'] && user['response']['token']) {
              localStorage.setItem('user', JSON.stringify(user['response']));
              this.auth.login();
            }
            return user['response'];
      });
  }

  checkLogin() {
    return this.get('user')
      .map(user => {
        if (user['response']) {
          this.auth.login();
          return true;
        }
      });
  }

  logout() {
    localStorage.removeItem('user');
    this.auth.logout();
  }

}
