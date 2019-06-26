import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginRoutes} from './login.routing';
import {SharedFormsModule} from '@shared/shared-forms/shared-forms.module';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutes,
    SharedFormsModule,
    TranslateModule,
    SharedModule,
  ],
})
export class LoginModule {
}
