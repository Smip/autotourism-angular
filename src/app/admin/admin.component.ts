import {Component, OnInit} from '@angular/core';
import {AuthService} from '@shared/services/auth.service';

const ADMIN_URL = '/admin/';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  links: any[] = [
    {routerLink: ADMIN_URL + '/trips', name: 'Пробеги'},
    {routerLink: ADMIN_URL + '/organizers', name: 'Организаторы'},
    {routerLink: ADMIN_URL + '/about', name: 'О движении'},
    {routerLink: ADMIN_URL + '/users', name: 'Пользователи'},
  ];

  constructor(private _auth: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this._auth.logOut();
  }

}
