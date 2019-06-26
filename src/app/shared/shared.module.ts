import {NgModule} from '@angular/core';

import {TransferHttpModule} from '@gorniv/ngx-universal';

import {LayoutsModule} from './layouts/layouts.module';
import {NgxMaterialize} from '@smip/ngx-materialize';
import {TranslateModule} from '@ngx-translate/core';
import {LoaderComponent} from '@shared/components/loader/loader.component';
import {MomentPipe} from '@shared/pipes/moment.pipe';
import {TimeLineComponent} from '@shared/components/time-line/time-line.component';
import {CommonModule} from '@angular/common';
import {MomentFromNowPipe} from '@shared/pipes/momentFromNow.pipe';
import {KeysPipe} from '@shared/pipes/keys.pipe';

@NgModule({
  declarations: [LoaderComponent, MomentPipe, TimeLineComponent, MomentFromNowPipe, KeysPipe],
  imports: [
    CommonModule,
    TranslateModule,
    NgxMaterialize,
  ],
  exports: [
    LayoutsModule,
    TransferHttpModule,
    NgxMaterialize,
    TranslateModule,
    LoaderComponent,
    MomentPipe,
    MomentFromNowPipe,
    TimeLineComponent,
    KeysPipe,
  ],
  providers: [],
})
export class SharedModule {
}
