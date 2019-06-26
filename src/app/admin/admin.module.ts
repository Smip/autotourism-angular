import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutes} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {LayoutsModule} from '@shared/layouts/layouts.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutes,
    LayoutsModule,
  ]
})
export class AdminModule { }
