import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrgsService} from '../../shared/services/orgs.service';
import {Subscription} from 'rxjs/Subscription';
import {Org} from '../../shared/models/org.model';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'autotourism-organisators-page',
  templateUrl: './organisators-page.component.html',
  styleUrls: ['./organisators-page.component.scss']
})
export class OrganisatorsPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoaded = false;
  orgs: Org[];

  constructor(
    private orgsService: OrgsService,
    private title: Title
  ) {
    title.setTitle('О организаторах Автотуризма без границ');
  }

  ngOnInit() {
    this.subscription = this.orgsService.getOrgs()
      .subscribe((data) => {
        this.orgs = data['response'];
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
