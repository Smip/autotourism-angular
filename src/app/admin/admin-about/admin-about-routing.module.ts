import {RouterModule, Routes} from '@angular/router';
import {AdminAboutComponent} from './admin-about.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAboutComponent,
  },
];

export const AdminAboutRoutes = RouterModule.forChild(routes);
