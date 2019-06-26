import {Component, OnInit} from '@angular/core';

const LINKS: any[] = [
  {routerLink: '/', name: 'home'},
  {routerLink: '/trips', name: 'trips'},
  {href: '/forum', name: 'forum'},
  {routerLink: '/about', name: 'about'},
  {routerLink: '/orgs', name: 'organizers'},
];

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit {
  public links: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
    const linkTemp = JSON.parse(JSON.stringify(LINKS));
    this.links = linkTemp.map((link) => {
      link.name = `footer.${link.name}`;
      return link;
    });
  }
}
