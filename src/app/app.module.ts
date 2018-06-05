import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PublicModule} from './public/public.module';
import {TripsService} from './shared/services/trips.service';
import {MembersService} from './shared/services/members.service';
import {ReportsService} from './shared/services/reports.service';
import {AboutService} from './shared/services/about.service';
import {OrgsService} from './shared/services/orgs.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from './shared/services/auth.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './shared/core/token.interceptor';
import {SidenavDirective} from './shared/directives/sidenav.directive';
import {UsersService} from './shared/services/users.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    SidenavDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    PublicModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    TripsService,
    MembersService,
    ReportsService,
    AboutService,
    OrgsService,
    AuthService,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
