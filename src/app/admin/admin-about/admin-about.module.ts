import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminAboutRoutes} from './admin-about-routing.module';
import {AdminAboutComponent} from './admin-about.component';
import {SharedModule} from '@shared/shared.module';
import {QuillModule} from 'ngx-quill';
import {QuillService} from '@shared/quill/quill.service';
import {SharedFormsModule} from '@shared/shared-forms/shared-forms.module';
import {FilesService} from '@shared/services/files.service';
import {AboutService} from '@shared/services/about.service';

@NgModule({
  declarations: [AdminAboutComponent],
  imports: [
    CommonModule,
    AdminAboutRoutes,
    SharedModule,
    SharedFormsModule,
    QuillModule,
  ],
  providers: [
    FilesService,
    QuillService,
    AboutService,
  ],
})
export class AdminAboutModule {
}
