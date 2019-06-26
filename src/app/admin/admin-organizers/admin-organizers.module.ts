import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminOrganizersRoutes} from './admin-organizers-routing.module';
import {AdminOrganizersComponent} from './admin-organizers.component';
import {SharedModule} from '@shared/shared.module';
import {OrgsService} from '@shared/services/orgs.service';

@NgModule({
  declarations: [AdminOrganizersComponent],
  imports: [
    CommonModule,
    AdminOrganizersRoutes,
    SharedModule,
  ],
  providers: [
    OrgsService,
  ],
})
export class AdminOrganizersModule {
}
