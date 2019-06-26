import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UniversalStorage} from '@shared/storage/universal.storage';
import {BaseApi} from '@shared/services/base-api';
import {toast} from '@smip/ngx-materialize';

@Injectable()
export class AuthService extends BaseApi {
  private _authToken: string;
  private _authState: BehaviorSubject<boolean>;
  private _initialData: string[] = [
    'token', 'interruptedUrl',
  ];

  constructor(@Inject(UniversalStorage) private _appStorage: Storage,
              private _http: HttpClient,
              private _router: Router) {
    super(_http);
    this._authState = new BehaviorSubject(!1);
    this._initialData.forEach((value) => {
      this[value] = this._getStoredItems(value);
    });
  }

  private _interruptedUrl: string;

  public get interruptedUrl(): string {
    return this._interruptedUrl;
  }

  public set interruptedUrl(url: string) {
    this._interruptedUrl = url;
    if (!url) {
      this._appStorage.removeItem('interruptedUrl');
    } else {
      this._saveValueInCookieStorage('interruptedUrl', url);
    }
  }

  public get token(): string {
    return this._authToken ? this._authToken : '';
  }

  public set token(token: string) {
    this._authToken = token;
    this.changeAuthState = !!token;
  }

  public set changeAuthState(newState: boolean) {
    this._authState.next(newState);
  }

  public isAuthenticated(): boolean {
    // This method is required to implement authentication.
    return !!this.token;
  }

  public logIn(formValue: { login: string, password: string }) {
    this.post('user', formValue).subscribe((response: { token: { token: string } }) => {
      this._saveValueInCookieStorage('token', response.token.token);
      this._router.navigate([this.interruptedUrl && this.interruptedUrl.length ? this.interruptedUrl : '/admin'])
          .then(() => {
            this.interruptedUrl = '';
            // TODO: If Notification (toast) service is present can show successfully Logged in message
          });
    }, err => {
      console.log(err);
      toast({html: 'Пользователь с таким логином и паролем не найден.'});
    });


  }

  public logOut() {
    this.token = '';
    this._appStorage.clear();
    this._router.navigate(['/']);
  }

  private _getStoredItems(key: string): any {
    return this._appStorage.getItem(key);
  }

  private _saveValueInCookieStorage(key: string, value: string): void {
    // For saving auth token in Cookie storage.
    this._appStorage.setItem(key, value);
    if (key === 'token') {
      this.token = value;
    }
  }
}
