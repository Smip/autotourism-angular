import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrganizersRoutes} from './organizers-routing.module';
import {OrganizersComponent} from './organizers.component';
import {OrgsService} from '@shared/services/orgs.service';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    OrganizersComponent,
  ],
  imports: [
    CommonModule,
    OrganizersRoutes,
    SharedModule,
  ],
  providers: [OrgsService],
})
export class OrganizersModule {
}
