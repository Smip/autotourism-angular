import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditRouteRoutes} from './edit-route-routing.module';
import {EditRouteComponent} from './edit-route.component';
import {AutocompleteService} from '@shared/services/autocomplete.service';
import {AdminTripsService} from '@shared/services/admin-trips.service';
import {GlobalsService} from '@shared/services/globals.service';
import {SharedFormsModule} from '@shared/shared-forms/shared-forms.module';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [EditRouteComponent],
  imports: [
    CommonModule,
    EditRouteRoutes,
    SharedFormsModule,
    SharedModule,
  ],
  providers: [
    AutocompleteService,
    AdminTripsService,
    GlobalsService,
  ],
})
export class EditRouteModule {
}
