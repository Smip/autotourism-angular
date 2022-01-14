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
        loadChildren: () => import('./admin-trips/admin-trips.module').then(m => m.AdminTripsModule),
      },
      {
        path: 'organizers',
        loadChildren: () => import('./admin-organizers/admin-organizers.module').then(m => m.AdminOrganizersModule),
      },
      {
        path: 'about',
        loadChildren: () => import('./admin-about/admin-about.module').then(m => m.AdminAboutModule),
      },
      {
        path: 'users',
        loadChildren: () => import('./admin-users/admin-users.module').then(m => m.AdminUsersModule),
      },
    ],
  },
];

export const AdminRoutes = RouterModule.forChild(routes);
