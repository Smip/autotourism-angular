import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {ILang, TranslatesService} from '@shared/translates';
import {AuthService} from '@shared/services/auth.service';

const LINKS: any[] = [
  {routerLink: '/', name: 'home'},
  {routerLink: '/trips', name: 'trips'},
  {href: '/forum', name: 'forum'},
  {routerLink: '/about', name: 'about'},
  {routerLink: '/orgs', name: 'organizers'},
];

const ADMIN_URL = '/admin/';
const admin_links: any[] = [
  {routerLink: ADMIN_URL + '/trips', name: 'Редактировать пробеги'},
  {routerLink: ADMIN_URL + '/organizers', name: 'Редактировать организаторов'},
  {routerLink: ADMIN_URL + '/about', name: 'Редактировать "О движении"'},
  {routerLink: ADMIN_URL + '/users', name: 'Редактировать Пользователей'},
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public langList$: Observable<ILang[]>;
  public currentLang: string;
  public links: any[] = [];
  public admin_links: any[] = [];

  constructor(private _translatesService: TranslatesService,
              private _auth: AuthService) {
  }

  ngOnInit(): void {
    this.langList$ = this._translatesService.getLangList();
    this.currentLang = this._translatesService.getCurrentLang();
    const linkTemp = JSON.parse(JSON.stringify(LINKS));
    this.links = linkTemp.map((link) => {
      link.name = `header.${link.name}`;
      return link;
    });
    if (this._auth.isAuthenticated()) {
      this.admin_links = admin_links;
    }
  }

  public changeLang(code: string): void {
    this._translatesService.changeLang(code);
    this.currentLang = code;
  }
}
