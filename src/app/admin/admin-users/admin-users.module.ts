import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminUsersRoutes} from './admin-users-routing.module';
import {AdminUsersComponent} from './admin-users.component';
import {SharedModule} from '../../shared/shared.module';
import {UsersService} from '@shared/services/users.service';

@NgModule({
  declarations: [AdminUsersComponent],
  imports: [
    CommonModule,
    AdminUsersRoutes,
    SharedModule,
  ],
  providers: [
    UsersService,
  ],
})
export class AdminUsersModule {
}
