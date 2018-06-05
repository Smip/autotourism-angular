import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrgsService} from '../../shared/services/orgs.service';
import {Subscription} from 'rxjs/Subscription';
import {Org} from '../../shared/models/org.model';

@Component({
  selector: 'autotourism-organisators-page',
  templateUrl: './organisators-page.component.html',
  styleUrls: ['./organisators-page.component.scss']
})
export class OrganisatorsPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoaded = false;
  orgs: Org[];

  constructor(private orgsService: OrgsService) { }

  ngOnInit() {
    this.subscription = this.orgsService.getOrgs()
      .subscribe((data) => {
        this.orgs = data['response'];
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
