import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AboutRoutes} from './about-routing.module';
import {AboutComponent} from './about.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '@shared/shared.module';
import {AboutService} from '@shared/services/about.service';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    AboutRoutes,
    TranslateModule,
    SharedModule,
  ],
  providers: [
    AboutService,
  ],
})
export class AboutModule {
}
