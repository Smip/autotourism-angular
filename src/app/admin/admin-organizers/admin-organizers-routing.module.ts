import {RouterModule, Routes} from '@angular/router';
import {AdminOrganizersComponent} from './admin-organizers.component';

const routes: Routes = [
  {
    path: '',
    component: AdminOrganizersComponent,
  },
  {
    path: 'new',
    loadChildren: () => import('./edit-organizer/edit-organizer.module').then(m => m.EditOrganizerModule),
  },
  {
    path: ':id',
    loadChildren: () => import('./edit-organizer/edit-organizer.module').then(m => m.EditOrganizerModule),
  },
];

export const AdminOrganizersRoutes = RouterModule.forChild(routes);
