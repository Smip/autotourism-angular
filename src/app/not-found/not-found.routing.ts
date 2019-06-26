import {NotFoundComponent} from './not-found.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
    data: {
      meta: {
        title: 'not-found.title',
        description: 'not-found.text',
      },
    },
  },
];

export const NotFoundRoutes = RouterModule.forChild(routes);
