import {RouterModule, Routes} from '@angular/router';
import {EditMembersComponent} from './edit-members.component';

const routes: Routes = [
  {
    path: '',
    component: EditMembersComponent,
  },
];

export const EditMembersRoutes = RouterModule.forChild(routes);
