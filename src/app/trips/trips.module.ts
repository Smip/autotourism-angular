import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TripsRoutes} from './trips-routing.module';
import {TripsComponent} from './trips.component';
import {TranslateModule} from '@ngx-translate/core';
import {TripsService} from '@shared/services/trips.service';
import {SharedModule} from '@shared/shared.module';
import {NotFoundService} from '@shared/services/not-found.service';

@NgModule({
  declarations: [TripsComponent],
  imports: [
    CommonModule,
    TripsRoutes,
    TranslateModule,
    SharedModule,
  ],
  providers: [
    TripsService,
    NotFoundService,
  ],
})
export class TripsModule {
}
