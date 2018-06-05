import {NgModule} from '@angular/core';
import {PaginatorPipe} from './pipes/paginator.pipe';
import {MomentPipe} from './pipes/moment.pipe';
import {DatepickerDirective} from './directives/datepicker.directive';
import {TimeLineComponent} from './components/time-line/time-line.component';
import {CommonModule} from '@angular/common';
import {OrderRoutePipe} from './pipes/order-route.pipe';
import {LoaderComponent} from './components/loader/loader.component';
import {AutocompleteDirective} from './directives/autocomplete.directive';
import {ModalDirective} from './directives/modal.directive';
import {ParallaxDirective} from './directives/parallax.directive';
import {DateMoreValidator} from './directives/date-more-validator.directive';
import {TabsDirective} from './directives/tabs.directive';
import {TranslateModule} from '@ngx-translate/core';
import {DropdownDirective} from "./directives/dropdown.directive";


@NgModule({
  declarations: [
    PaginatorPipe,
    MomentPipe,
    DatepickerDirective,
    TimeLineComponent,
    OrderRoutePipe,
    LoaderComponent,
    AutocompleteDirective,
    ModalDirective,
    ParallaxDirective,
    DateMoreValidator,
    TabsDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    PaginatorPipe,
    MomentPipe,
    DatepickerDirective,
    TimeLineComponent,
    OrderRoutePipe,
    LoaderComponent,
    AutocompleteDirective,
    ModalDirective,
    ParallaxDirective,
    DateMoreValidator,
    TabsDirective,
    TranslateModule,
    DropdownDirective
  ]
})
export class SharedModule {

}

