import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {AuthService} from './shared/services/auth.service';
import {UsersService} from './shared/services/users.service';
import {Subscription} from 'rxjs/Subscription';
import {TranslateService} from '@ngx-translate/core';
import * as M from '../../node_modules/materialize-css/dist/js/materialize.js';


@Component({
  selector: 'autotourism-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('Dropdown') dropdownEl: ElementRef;

  date = new Date();
  loading = false;
  subscription: Subscription;

  constructor(private router: Router,
              public authService: AuthService,
              private usersServise: UsersService,
              private translate: TranslateService) {
    translate.addLangs(['en', 'ru']);
    translate.setDefaultLang('ru');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ru/) ? browserLang : 'ru');

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

  changeLang(lang: string= '') {
    if (lang) {
      this.translate.use(lang);
    } else {
      if (this.translate.currentLang === 'ru') {
        this.translate.use('en');
      } else {
        this.translate.use('ru');
      }
    }

  }

  ngOnInit(): void {
    this.subscription = this.usersServise.checkLogin().subscribe();

  }

  ngAfterViewInit(): void {
    M.Dropdown.init(this.dropdownEl.nativeElement);
  }


  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  onLogout() {
    this.usersServise.logout();
    this.router.navigate(['/']);
  }
}
