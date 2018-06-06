import {Component, OnDestroy, OnInit} from '@angular/core';
import {Org} from '../../shared/models/org.model';
import {OrgsService} from '../../shared/services/orgs.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'autotourism-orgs',
  templateUrl: './orgs.component.html',
  styleUrls: ['./orgs.component.scss']
})
export class OrgsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoaded = false;
  orgs: Org[];
  candidateToDelete: Org = new Org;

  constructor(private orgsService: OrgsService) { }

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

  onDeleteOrg(org) {
    this.candidateToDelete = org;
  }

  confirmDeleteOrg(org) {

    this.orgsService.deleteOrg(org.id)
      .subscribe((data) => {
        if (data['response']) {
          this.orgs = this.orgs.filter((o) => {
            return o.id !== org.id;
          });
        }
      });
  }
}
