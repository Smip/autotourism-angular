import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

import {HomeRoutes} from './home.routing';
import {HomeComponent} from './home.component';
import {TripsService} from '@shared/services/trips.service';
import {PlansComponent} from './plans/plans.component';
import {CurrentTripComponent} from './current-trip/current-trip.component';
import {SharedModule} from '@shared/shared.module';
import {LastTripsComponent} from './last-trips/last-trips.component';

@NgModule({
  declarations: [
    HomeComponent,
    PlansComponent,
    CurrentTripComponent,
    LastTripsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutes,
    TranslateModule,
    SharedModule,
  ],
  providers: [
    TripsService,
  ],
})
export class HomeModule {
}
