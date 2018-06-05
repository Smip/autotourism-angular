import {Component, OnInit} from '@angular/core';
import {AboutService} from "../../shared/services/about.service";
import {Subscription} from "rxjs/Rx";


@Component({
  selector: 'autotourism-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit {

  subscription: Subscription;
  isLoaded = false;
  about:string = "";

  constructor(private aboutService: AboutService) { }

  ngOnInit() {
    this.subscription = this.aboutService.getAbout()
      .subscribe((data)=> {
        this.about = data['response'];
        this.isLoaded = true;
      })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
