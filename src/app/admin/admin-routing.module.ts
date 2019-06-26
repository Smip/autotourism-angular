import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'trips', pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent, // Wrapper
    children: [
      {
        path: 'trips',
        loadChildren: './admin-trips/admin-trips.module#AdminTripsModule',
      },
      {
        path: 'organizers',
        loadChildren: './admin-organizers/admin-organizers.module#AdminOrganizersModule',
      },
      {
        path: 'about',
        loadChildren: './admin-about/admin-about.module#AdminAboutModule',
      },
      {
        path: 'users',
        loadChildren: './admin-users/admin-users.module#AdminUsersModule',
      },
    ],
  },
];

export const AdminRoutes = RouterModule.forChild(routes);
