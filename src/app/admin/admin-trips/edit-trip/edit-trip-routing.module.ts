import {RouterModule, Routes} from '@angular/router';
import {EditTripComponent} from './edit-trip.component';

const routes: Routes = [
  {
    path: '',
    component: EditTripComponent,
  },
];

export const EditTripRoutes = RouterModule.forChild(routes);
