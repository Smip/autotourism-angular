import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TripRoutes} from './trip-routing.module';
import {TripComponent} from './trip.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '@shared/shared.module';
import {TripsService} from '@shared/services/trips.service';

@NgModule({
  declarations: [TripComponent],
  imports: [
    CommonModule,
    TripRoutes,
    TranslateModule,
    SharedModule,
  ],
  providers: [
    TripsService,
  ],
})
export class TripModule {
}
