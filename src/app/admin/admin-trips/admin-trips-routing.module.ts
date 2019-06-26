import {RouterModule, Routes} from '@angular/router';
import {AdminTripsComponent} from './admin-trips.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTripsComponent,
  },
  {
    path: ':id/route',
    loadChildren: './edit-route/edit-route.module#EditRouteModule',
  },
  {
    path: ':id/report',
    loadChildren: './edit-report/edit-report.module#EditReportModule',
  },
  {
    path: ':id/members',
    loadChildren: './edit-members/edit-members.module#EditMembersModule',
  },
  {
    path: 'new',
    loadChildren: './edit-trip/edit-trip.module#EditTripModule',
  },
  {
    path: ':id',
    loadChildren: './edit-trip/edit-trip.module#EditTripModule',
  },
];

export const AdminTripsRoutes = RouterModule.forChild(routes);
