import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditMembersRoutes} from './edit-members-routing.module';
import {EditMembersComponent} from './edit-members.component';
import {AutocompleteService} from '@shared/services/autocomplete.service';
import {AdminTripsService} from '@shared/services/admin-trips.service';
import {SharedFormsModule} from '@shared/shared-forms/shared-forms.module';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [EditMembersComponent],
  imports: [
    CommonModule,
    EditMembersRoutes,
    SharedFormsModule,
    SharedModule,
  ],
  providers: [
    AutocompleteService,
    AdminTripsService,
  ],
})
export class EditMembersModule {
}
