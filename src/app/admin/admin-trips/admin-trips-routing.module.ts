import {RouterModule, Routes} from '@angular/router';
import {AdminTripsComponent} from './admin-trips.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTripsComponent,
  },
  {
    path: ':id/route',
    loadChildren: () => import('./edit-route/edit-route.module').then(m => m.EditRouteModule),
  },
  {
    path: ':id/report',
    loadChildren: () => import('./edit-report/edit-report.module').then(m => m.EditReportModule),
  },
  {
    path: ':id/members',
    loadChildren: () => import('./edit-members/edit-members.module').then(m => m.EditMembersModule),
  },
  {
    path: 'new',
    loadChildren: () => import('./edit-trip/edit-trip.module').then(m => m.EditTripModule),
  },
  {
    path: ':id',
    loadChildren: () => import('./edit-trip/edit-trip.module').then(m => m.EditTripModule),
  },
];

export const AdminTripsRoutes = RouterModule.forChild(routes);
