import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainPageComponent} from './main-page/main-page.component';
import {CurrentTripComponent} from './main-page/current-trip/current-trip.component';
import {PlansComponent} from './main-page/plans/plans.component';
import {TripsComponent} from './main-page/trips/trips.component';
import {PublicRoutingModule} from './public-routing.module';
import {PublicComponent} from './public.component';
import {TripDetailsComponent} from './main-page/trips/trip-details/trip-details.component';
import {TripPageComponent} from './trip-page/trip-page.component';
import {InfoPageComponent} from './trip-page/info-page/info-page.component';
import {MembersPageComponent} from './trip-page/members-page/members-page.component';
import {ReportPageComponent} from './trip-page/report-page/report-page.component';

import {TripsPageComponent} from './trips-page/trips-page.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {OrganisatorsPageComponent} from './organisators-page/organisators-page.component';
import {SharedModule} from "../shared/shared.module";
import {WelcomeMessageComponent} from './main-page/welcome-message/welcome-message.component';
import {AuthComponent} from "./auth/auth.component";
import {FormsModule} from "@angular/forms";
import {UsersService} from "../shared/services/users.service";


@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    MainPageComponent,
    CurrentTripComponent,
    PlansComponent,
    TripsComponent,
    PublicComponent,
    TripDetailsComponent,
    TripPageComponent,
    InfoPageComponent,
    MembersPageComponent,
    ReportPageComponent,
    TripsPageComponent,
    AboutPageComponent,
    OrganisatorsPageComponent,
    AuthComponent,
    WelcomeMessageComponent
  ],
  providers: [UsersService]
})

export class PublicModule {
}

