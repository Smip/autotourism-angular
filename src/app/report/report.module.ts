import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportRoutes} from './report-routing.module';
import {ReportComponent} from './report.component';
import {TripsService} from '@shared/services/trips.service';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportRoutes,
    TranslateModule,
    SharedModule,
  ],
  providers: [TripsService],
})
export class ReportModule {
}
