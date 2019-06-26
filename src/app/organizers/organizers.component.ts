import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrgsService} from '@shared/services/orgs.service';
import {Organizer} from '@shared/models/organizer.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-organizers',
  templateUrl: './organizers.component.html',
  styleUrls: ['./organizers.component.scss'],
})
export class OrganizersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoaded = false;
  orgs: Organizer[];

  constructor(private _orgs: OrgsService) {
  }

  ngOnInit() {
    this.subscription = this._orgs.getOrgs()
                            .subscribe((data) => {
                              this.orgs = data['organisators'];
                              this.isLoaded = true;
                            });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
