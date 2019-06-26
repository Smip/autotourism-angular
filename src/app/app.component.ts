import {Component} from '@angular/core';

import {MetaService} from '@ngx-meta/core';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(private readonly meta: MetaService, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    angulartics2GoogleAnalytics.startTracking();
  }
}
