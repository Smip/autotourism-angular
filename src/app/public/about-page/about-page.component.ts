import {Component, OnDestroy, OnInit} from '@angular/core';
import {AboutService} from '../../shared/services/about.service';
import {Subscription} from 'rxjs/Subscription';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'autotourism-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  isLoaded = false;
  about = '';

  constructor(
    private aboutService: AboutService,
    private title: Title) {
    title.setTitle('О движении Автотуризм без границ');
  }

  ngOnInit() {
    this.subscription = this.aboutService.getAbout()
      .subscribe((data) => {
        this.about = data['response'];
        this.isLoaded = true;
      });

  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
