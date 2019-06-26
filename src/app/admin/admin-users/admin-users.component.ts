import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UsersService} from '@shared/services/users.service';
import {User} from '@shared/models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit {

  subscription: Subscription;
  isLoaded = false;
  users: User[];
  candidateToDelete: User;

  constructor(private _users: UsersService) {
  }

  ngOnInit() {
    this.subscription = this._users.getUsers()
                            .subscribe((data) => {
                              this.users = data['users'];
                              this.isLoaded = true;
                            });
  }

  onDeleteOrg(user) {
    this.candidateToDelete = user;
  }

  confirmDeleteOrg() {
    this._users.deleteUser(this.candidateToDelete.id)
        .subscribe((data) => {
          this.users = this.users.filter((user) => {
            return user.id !== this.candidateToDelete.id;
          });
          this.candidateToDelete = undefined;
        });
  }
}
