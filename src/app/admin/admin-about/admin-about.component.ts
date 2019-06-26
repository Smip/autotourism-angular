import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {QuillService} from '@shared/quill/quill.service';
import {About} from '@shared/models/about.model';
import {AboutService} from '@shared/services/about.service';
import {toast} from '@smip/ngx-materialize';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-admin-about',
  templateUrl: './admin-about.component.html',
  styleUrls: ['./admin-about.component.scss'],
})
export class AdminAboutComponent implements OnInit {

  subscription: Subscription;
  subscription2: Subscription;
  isLoaded = false;
  modules;
  formats = [
    'bold',
    'italic',
    'link',
    'underline',
    'blockquote',
    'header',
    'indent',
    'list',
    'image'];
  form: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _about: AboutService,
    private _quill: QuillService,
  ) {
  }

  ngOnInit() {
    this.modules = this._quill.modules();
    this.subscription = this._about.getAbout().subscribe(response => {
      this.form = this.getForm(response['about']);
      this.isLoaded = true;
    });

  }

  addBindingCreated(event) {
    const toolbar = event.getModule('toolbar');
    toolbar.quill.theme.tooltip.textbox.className = 'browser-default';
    toolbar.quill.theme.tooltip.textbox.dataset.link = 'Вставьте ссылку и нажмите Enter';
  }

  getForm(about: About = new About()) {
    return this._formBuilder.group({
        'article': [about.article],
      },
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({onlySelf: true});
      });
      return;
    }
    const about = this.form.value;
    if (about.article) {
      about.article = about.article.replace(/\t/g, ' ');
      about.article = about.article.replace(/\s+/g, ' ');
      about.article = about.article.replace(/<p><br><\/p>/g, '');
    }
    this.subscription2 = this._about.editAbout(about)
                             .subscribe((data) => {
                               toast({html: 'Сохранено'});
                             });
  }


}
