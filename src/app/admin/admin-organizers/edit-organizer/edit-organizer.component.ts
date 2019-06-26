import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Organizer} from '@shared/models/organizer.model';
import {FilesService} from '@shared/services/files.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrgsService} from '@shared/services/orgs.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuillService} from '@shared/quill/quill.service';
import {toast, updateTextFields} from '@smip/ngx-materialize';

@Component({
  selector: 'app-edit-organizer',
  templateUrl: './edit-organizer.component.html',
  styleUrls: ['./edit-organizer.component.scss'],
})
export class EditOrganizerComponent implements OnInit {

  subscription: Subscription;
  subscription2: Subscription;
  isLoaded = false;
  photoIsLoading = false;
  org: Organizer;
  id: number;
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
  message: string;

  constructor(private _orgs: OrgsService,
              private _files: FilesService,
              private _route: ActivatedRoute,
              private _formBuilder: FormBuilder,
              private _quill: QuillService,
              private _router: Router) {
  }

  ngOnInit() {
    this.modules = this._quill.modules();
    this.id = +this._route.snapshot.params['id'];
    if (this.id) {
      this.subscription = this._orgs.getOrg(+this.id)
                              .subscribe((data) => {
                                this.org = data['organisator'];
                                this.form = this.getForm(this.org);
                                this.isLoaded = true;
                                setTimeout(() => {
                                  updateTextFields();
                                }, 0);
                              });
    } else {
      this.form = this.getForm();
      this.isLoaded = true;
    }


  }

  addBindingCreated(event) {
    const toolbar = event.getModule('toolbar');
    toolbar.quill.theme.tooltip.textbox.className = 'browser-default';
    toolbar.quill.theme.tooltip.textbox.dataset.link = 'Вставьте ссылку и нажмите Enter';
  }

  getForm(org: Organizer = new Organizer()) {
    return this._formBuilder.group({
        'name': [org.name, [Validators.required, Validators.minLength(3)]],
        'nick': [org.nick],
        'photo': [org.photo],
        'description': [org.description, [Validators.required, Validators.minLength(4)]],
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
    const org = this.form.value;
    if (org.description) {
      org.description = org.description.replace(/\t/g, ' ');
      org.description = org.description.replace(/\s+/g, ' ');
      org.description = org.description.replace(/<p><br><\/p>/g, '');
    }
    if (this.id) {
      this.subscription2 = this._orgs.editOrg(this.id, org)
                               .subscribe((data) => {
                                 toast({html: 'Сохранено'});
                               });
    } else {
      this.subscription2 = this._orgs.addOrg(org)
                               .subscribe((data) => {
                                 toast({html: 'Добавлено!'});
                                 this._router.navigate(['/admin', 'organizers', data['organisator'].id]);
                               });
    }

  }

  onUpload(fileInput: any) {
    const file = <File>fileInput.target.files[0];
    const fb = new FormData();
    fb.append('file', file, file.name);
    this._files.addFile(fb).subscribe(event => {
      this.form.controls.photo.patchValue(event['file']);
    });

  }


}
