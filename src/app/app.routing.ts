import {RouterModule, Routes} from '@angular/router';
import {MetaGuard} from '@ngx-meta/core';

import {WrapperComponent} from '@shared/layouts/wrapper/wrapper.component';
import {AuthGuard} from '@shared/guards/auth.guard';
import {UnAuthGuard} from '@shared/guards/un-auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [UnAuthGuard],
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [
      {path: '', loadChildren: './home/home.module#HomeModule'},
      {path: 'trips', loadChildren: './trips/trips.module#TripsModule'},
      {path: 'trips/:id/report', loadChildren: './report/report.module#ReportModule'},
      {path: 'trips/:id', loadChildren: './trip/trip.module#TripModule'},
      {path: 'orgs', loadChildren: './organizers/organizers.module#OrganizersModule'},
      {path: 'about', loadChildren: './about/about.module#AboutModule'},
    ],
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [{path: '**', loadChildren: './not-found/not-found.module#NotFoundModule'}],
  },
];
// must use {initialNavigation: 'enabled'}) - for one load page, without reload
export const AppRoutes = RouterModule.forRoot(routes, {initialNavigation: 'enabled'});
