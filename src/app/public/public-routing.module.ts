import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PublicComponent} from './public.component';
import {MainPageComponent} from './main-page/main-page.component';
import {TripPageComponent} from './trip-page/trip-page.component';
import {InfoPageComponent} from "./trip-page/info-page/info-page.component";
import {MembersPageComponent} from './trip-page/members-page/members-page.component';
import {ReportPageComponent} from './trip-page/report-page/report-page.component';
import {TripsPageComponent} from "./trips-page/trips-page.component";
import {OrganisatorsPageComponent} from "./organisators-page/organisators-page.component";
import {AboutPageComponent} from "./about-page/about-page.component";


const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
    {path: '', component: MainPageComponent},
    {
      path: 'trips/:id', component: TripPageComponent, children: [
      {path: 'info', component: InfoPageComponent},
      {path: 'members', component: MembersPageComponent},
    ]
    },
    {path: 'report/:id', component: ReportPageComponent},
    {path: 'trips', component: TripsPageComponent},
    {path: 'orgs', component: OrganisatorsPageComponent},
    {path: 'about', component: AboutPageComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublicRoutingModule {
}
