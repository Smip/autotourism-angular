import {Component, OnDestroy, OnInit} from '@angular/core';
import {AboutService} from '../../shared/services/about.service';
import {Subscription} from 'rxjs/Subscription';
import {NgForm} from '@angular/forms';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
  selector: 'autotourism-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [ fadeStateTrigger ]
})
export class AboutComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  subscription2: Subscription;

  modules = {};
  isLoaded = false;
  article = '';
  message: string;

  constructor(private aboutService: AboutService) { }

  ngOnInit() {
    this.subscription = this.aboutService.getAbout()
      .subscribe((data) => {
        this.article = data['response']['article'];
        this.isLoaded = true;
      });
    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline'],        // toggled buttons
        ['blockquote'],
        [{ 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean'],                                         // remove formatting button
        ['link', 'image', 'video']
      ],
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.subscription2 = this.aboutService.editAbout(form.value)
      .subscribe((data) => {
        if (data['response']) {
          this.message = 'Сохранения изменены!';
          setTimeout(() => {
            this.message = null;
          }, 5000);
        }
      });
  }

}
