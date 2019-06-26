import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '@shared/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router,
              private auth: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth', 'login'])
          .then(() => {
            this.auth.interruptedUrl = state.url;
            // TODO: If Notification (toast) service is present we can show warning message
          });
    }
    return this.auth.isAuthenticated();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
