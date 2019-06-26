import {RouterModule, Routes} from '@angular/router';
import {EditUserComponent} from './edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: EditUserComponent,
  },
];

export const EditUserRoutes = RouterModule.forChild(routes);
