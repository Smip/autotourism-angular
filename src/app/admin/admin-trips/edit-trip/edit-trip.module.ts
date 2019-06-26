import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditTripRoutes} from './edit-trip-routing.module';
import {EditTripComponent} from './edit-trip.component';
import {SharedModule} from '@shared/shared.module';
import {AdminTripsService} from '@shared/services/admin-trips.service';
import {SharedFormsModule} from '@shared/shared-forms/shared-forms.module';
import {GlobalsService} from '@shared/services/globals.service';

@NgModule({
  declarations: [EditTripComponent],
  imports: [
    CommonModule,
    EditTripRoutes,
    SharedModule,
    SharedFormsModule,
  ],
  providers: [
    AdminTripsService,
    GlobalsService,
  ],
})
export class EditTripModule {
}
