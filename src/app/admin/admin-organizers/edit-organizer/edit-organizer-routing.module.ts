import {RouterModule, Routes} from '@angular/router';

import {EditOrganizerComponent} from './edit-organizer.component';

const routes: Routes = [
  {
    path: '',
    component: EditOrganizerComponent,
  },
];

export const EditOrganizerRoutes = RouterModule.forChild(routes);
