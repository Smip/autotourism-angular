import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {AuthService} from "./shared/services/auth.service";
import {UsersService} from "./shared/services/users.service";
import {Subscription} from "rxjs/Rx";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'autotourism-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {


  date = new Date();
  loading: boolean = false;
  subscription: Subscription;

  constructor(private router: Router,
              public authService: AuthService,
              private usersServise: UsersService,
              private translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('ru');
    translate.use('ru');
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        this.loading = false;
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.subscription = this.usersServise.checkLogin().subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onLogout() {
    this.usersServise.logout();
    this.router.navigate(['/']);
  }
}
