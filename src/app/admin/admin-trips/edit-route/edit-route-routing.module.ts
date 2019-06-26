import {RouterModule, Routes} from '@angular/router';
import {EditRouteComponent} from './edit-route.component';

const routes: Routes = [
  {
    path: '',
    component: EditRouteComponent,
  },
];

export const EditRouteRoutes = RouterModule.forChild(routes);
