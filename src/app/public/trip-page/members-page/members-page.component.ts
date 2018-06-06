import {Component, OnDestroy, OnInit} from '@angular/core';
import {MembersService} from '../../../shared/services/members.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';
import {Member} from '../../../shared/models/member.model';

@Component({
  selector: 'autotourism-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss']
})
export class MembersPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  id: string;
  members: Member[];

  isLoaded = false;
  constructor(private membersService: MembersService, private route: ActivatedRoute) {
    this.id = route.snapshot.parent.params['id'];
  }


  ngOnInit() {
    this.subscription = this.membersService.getMembers(+this.id)
      .subscribe((data) => {
        this.members = data['response'];
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
