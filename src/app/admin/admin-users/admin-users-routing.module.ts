import {RouterModule, Routes} from '@angular/router';
import {AdminUsersComponent} from './admin-users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUsersComponent,
  },
  {
    path: 'new',
    loadChildren: () => import('./edit-user/edit-user.module').then(m => m.EditUserModule),
  },
  {
    path: ':id',
    loadChildren: () => import('./edit-user/edit-user.module').then(m => m.EditUserModule),
  },
];

export const AdminUsersRoutes = RouterModule.forChild(routes);
