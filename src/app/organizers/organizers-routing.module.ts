import {RouterModule, Routes} from '@angular/router';
import {OrganizersComponent} from './organizers.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizersComponent,
    data: {
      meta: {
        title: 'organizers.title',
        description: 'organizers.text',
        override: true,
      },
    },
  },
];

export const OrganizersRoutes = RouterModule.forChild(routes);
