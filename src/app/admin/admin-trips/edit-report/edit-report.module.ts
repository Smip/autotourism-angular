import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EditReportRoutes} from './edit-report-routing.module';
import {EditReportComponent} from './edit-report.component';
import {QuillModule} from 'ngx-quill';
import {SharedModule} from '@shared/shared.module';
import {TripsService} from '@shared/services/trips.service';
import {FilesService} from '@shared/services/files.service';
import {SharedFormsModule} from '@shared/shared-forms/shared-forms.module';
import {QuillService} from '@shared/quill/quill.service';

@NgModule({
  declarations: [EditReportComponent],
  imports: [
    CommonModule,
    EditReportRoutes,
    SharedModule,
    SharedFormsModule,
    QuillModule,
  ],
  providers: [
    FilesService,
    TripsService,
    QuillService,
  ],
})
export class EditReportModule {
}
