import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AboutService} from '@shared/services/about.service';
import {About} from '@shared/models/about.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  isLoaded = false;
  about: About;

  constructor(private _about: AboutService) {
  }

  ngOnInit() {
    this.subscription = this._about.getAbout()
                            .subscribe((data) => {
                              this.about = data.about;
                              this.isLoaded = true;
                            });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
