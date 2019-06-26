import {RouterModule, Routes} from '@angular/router';
import {AdminOrganizersComponent} from './admin-organizers.component';

const routes: Routes = [
  {
    path: '',
    component: AdminOrganizersComponent,
  },
  {
    path: 'new',
    loadChildren: './edit-organizer/edit-organizer.module#EditOrganizerModule',
  },
  {
    path: ':id',
    loadChildren: './edit-organizer/edit-organizer.module#EditOrganizerModule',
  },
];

export const AdminOrganizersRoutes = RouterModule.forChild(routes);
