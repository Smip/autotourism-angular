import {RouterModule, Routes} from '@angular/router';
import {ReportComponent} from './report.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    data: {
      meta: {
        title: 'report.title',
        description: 'report.text',
        override: true,
      },
    },
  },
];

export const ReportRoutes = RouterModule.forChild(routes);
