import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {TripsComponent} from './trips/trips.component';
import {AboutComponent} from './about/about.component';
import {OrgsComponent} from './orgs/orgs.component';
import {EditOrgComponent} from './orgs/edit-org/edit-org.component';
import {EditTripComponent} from './trips/edit-trip/edit-trip.component';
import {EditRouteComponent} from './trips/edit-route/edit-route.component';
import {EditMembersComponent} from './trips/edit-members/edit-members.component';
import {EditReportComponent} from './trips/edit-report/edit-report.component';
import {AddOrgComponent} from './orgs/add-org/add-org.component';
import {AuthGuard} from '../shared/services/auth.guard';
import {MainComponent} from './main/main.component';
import {CrewComponent} from './main/crew/crew.component';
import {CitiesComponent} from './main/cities/cities.component';
import {CarsComponent} from './main/cars/cars.component';

const routes: Routes = [
  {path: '', component: AdminComponent, canActivate: [AuthGuard], children: [
    {path: '', component: MainComponent, children: [
      {path: 'crew', component: CrewComponent},
      {path: 'cities', component: CitiesComponent},
      {path: 'cars', component: CarsComponent},
    ]},
    {path: 'trips', component: TripsComponent},
    {path: 'about', component: AboutComponent},
    {path: 'orgs', component: OrgsComponent},
    {path: 'orgs/new', component: AddOrgComponent},
    {path: 'orgs/:id', component: EditOrgComponent},
    {path: 'trips/new', component: EditTripComponent},
    {path: 'trips/info/:id', component: EditTripComponent},
    {path: 'trips/route/:id', component: EditRouteComponent},
    {path: 'trips/members/:id', component: EditMembersComponent},
    {path: 'trips/report/:id', component: EditReportComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
