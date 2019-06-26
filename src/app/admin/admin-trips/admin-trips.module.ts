import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminTripsRoutes} from './admin-trips-routing.module';
import {AdminTripsComponent} from './admin-trips.component';
import {SharedModule} from '../../shared/shared.module';
import {AdminTripsService} from '@shared/services/admin-trips.service';

@NgModule({
  declarations: [AdminTripsComponent],
  imports: [
    CommonModule,
    AdminTripsRoutes,
    SharedModule,
  ],
  providers: [
    AdminTripsService,
  ],
})
export class AdminTripsModule {
}
