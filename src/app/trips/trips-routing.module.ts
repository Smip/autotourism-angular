import {RouterModule, Routes} from '@angular/router';
import {TripsComponent} from './trips.component';

const routes: Routes = [
  {
    path: '',
    component: TripsComponent,
    data: {
      meta: {
        title: 'trips.title',
        description: 'trips.text',
        override: true,
      },
    },
  },
];

export const TripsRoutes = RouterModule.forChild(routes);
