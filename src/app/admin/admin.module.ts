import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {TripsComponent} from './trips/trips.component';
import {AboutComponent} from './about/about.component';
import {OrgsComponent} from './orgs/orgs.component';
import {AdminRoutingModule} from './admin-routing.module';
import {SharedModule} from '../shared/shared.module';
import {PaginatorButtonsComponent} from '../shared/components/paginator-buttons/pagnator-buttons.component';
import {QuillModule} from 'ngx-quill';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditOrgComponent} from './orgs/edit-org/edit-org.component';
import {EditTripComponent} from './trips/edit-trip/edit-trip.component';
import {EditRouteComponent} from './trips/edit-route/edit-route.component';
import {EditMembersComponent} from './trips/edit-members/edit-members.component';
import {EditReportComponent} from './trips/edit-report/edit-report.component';
import {AddOrgComponent} from './orgs/add-org/add-org.component';
import {FilesService} from '../shared/services/files.service';
import {AutocompleteService} from '../shared/services/autocomplete.service';
import {AuthGuard} from '../shared/services/auth.guard';
import {ChartsModule} from 'ng2-charts';
import {MainComponent} from './main/main.component';
import {ChatsService} from '../shared/services/chats.service';
import {CrewComponent} from './main/crew/crew.component';
import {CitiesComponent} from './main/cities/cities.component';
import {CarsComponent} from './main/cars/cars.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    QuillModule,
    ChartsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminComponent,
    TripsComponent,
    AboutComponent,
    OrgsComponent,
    PaginatorButtonsComponent,
    EditOrgComponent,
    EditTripComponent,
    EditRouteComponent,
    EditMembersComponent,
    EditReportComponent,
    AddOrgComponent,
    MainComponent,
    CrewComponent,
    CitiesComponent,
    CarsComponent
  ],
  providers: [FilesService, AutocompleteService, AuthGuard, ChatsService],
})
export class AdminModule { }
