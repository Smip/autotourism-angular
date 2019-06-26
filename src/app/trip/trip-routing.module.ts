import {RouterModule, Routes} from '@angular/router';
import {TripComponent} from './trip.component';

const routes: Routes = [
  {
    path: '',
    component: TripComponent,
    data: {
      meta: {
        title: 'trip.title',
        description: 'trip.text',
        override: true,
      },
    },
  },
];

export const TripRoutes = RouterModule.forChild(routes);
