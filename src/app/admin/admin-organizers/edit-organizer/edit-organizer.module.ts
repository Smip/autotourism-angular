import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditOrganizerComponent} from './edit-organizer.component';
import {EditOrganizerRoutes} from './edit-organizer-routing.module';
import {SharedModule} from '@shared/shared.module';
import {OrgsService} from '@shared/services/orgs.service';
import {FilesService} from '@shared/services/files.service';
import {SharedFormsModule} from '@shared/shared-forms/shared-forms.module';
import {QuillService} from '@shared/quill/quill.service';
import {QuillModule} from 'ngx-quill';

@NgModule({
  declarations: [EditOrganizerComponent],
  imports: [
    CommonModule,
    EditOrganizerRoutes,
    SharedModule,
    SharedFormsModule,
    QuillModule,
  ],
  providers: [
    OrgsService,
    FilesService,
    QuillService,
  ],
})
export class EditOrganizerModule {
}
