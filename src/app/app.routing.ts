import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';

import { WrapperComponent } from '@shared/layouts/wrapper/wrapper.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { UnAuthGuard } from '@shared/guards/un-auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [UnAuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: WrapperComponent,
    canActivateChild: [MetaGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'trips',
        loadChildren: () => import('./trips/trips.module').then(m => m.TripsModule)
      },
      {
        path: 'trips/:id/report',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule)
      },
      {
        path: 'trips/:id',
        loadChildren: () => import('./trip/trip.module').then(m => m.TripModule)
      },
      {
        path: 'orgs',
        loadChildren: () => import('./organizers/organizers.module').then(m => m.OrganizersModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
      },
      {
        path: '**',
        loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
      }
    ]
  }
];
// must use {initialNavigation: 'enabled'}) - for one load page, without reload
export const AppRoutes = RouterModule.forRoot(routes, { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' });
