import {RouterModule, Routes} from '@angular/router';
import {EditReportComponent} from './edit-report.component';

const routes: Routes = [
  {
    path: '',
    component: EditReportComponent,
  },
];

export const EditReportRoutes = RouterModule.forChild(routes);
