import {RouterModule, Routes} from '@angular/router';
import {AdminUsersComponent} from './admin-users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUsersComponent,
  },
  {
    path: 'new',
    loadChildren: './edit-user/edit-user.module#EditUserModule',
  },
  {
    path: ':id',
    loadChildren: './edit-user/edit-user.module#EditUserModule',
  },
];

export const AdminUsersRoutes = RouterModule.forChild(routes);
