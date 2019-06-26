import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditUserRoutes} from './edit-user-routing.module';
import {EditUserComponent} from './edit-user.component';
import {UsersService} from '@shared/services/users.service';
import {SharedModule} from '@shared/shared.module';
import {SharedFormsModule} from '@shared/shared-forms/shared-forms.module';

@NgModule({
  declarations: [EditUserComponent],
  imports: [
    CommonModule,
    EditUserRoutes,
    SharedModule,
    SharedFormsModule,
  ],
  providers: [
    UsersService,
  ],
})
export class EditUserModule {
}
