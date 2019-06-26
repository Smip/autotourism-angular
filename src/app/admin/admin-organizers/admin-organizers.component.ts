import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Organizer} from '@shared/models/organizer.model';
import {OrgsService} from '@shared/services/orgs.service';

@Component({
  selector: 'app-admin-organizers',
  templateUrl: './admin-organizers.component.html',
  styleUrls: ['./admin-organizers.component.scss'],
})
export class AdminOrganizersComponent implements OnInit {

  subscription: Subscription;
  isLoaded = false;
  orgs: Organizer[];
  candidateToDelete: Organizer;

  constructor(private _orgs: OrgsService) {
  }

  ngOnInit() {
    this.subscription = this._orgs.getOrgs()
                            .subscribe((data) => {
                              this.orgs = data['organisators'];
                              this.isLoaded = true;
                            });
  }

  onDeleteOrg(org) {
    this.candidateToDelete = org;
  }

  confirmDeleteOrg() {
    this._orgs.deleteOrg(this.candidateToDelete.id)
        .subscribe((data) => {
          this.orgs = this.orgs.filter((org) => {
            return org.id !== this.candidateToDelete.id;
          });
          this.candidateToDelete = undefined;
        });
  }

}
