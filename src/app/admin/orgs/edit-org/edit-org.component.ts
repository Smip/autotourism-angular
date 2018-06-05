import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Location} from '@angular/common';

import {OrgsService} from '../../../shared/services/orgs.service';
import {Org} from '../../../shared/models/org.model';
import {FilesService} from '../../../shared/services/files.service';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';


@Component({
  selector: 'autotourism-edit-org',
  templateUrl: './edit-org.component.html',
  styleUrls: ['./edit-org.component.scss'],
  animations: [ fadeStateTrigger ]
})
export class EditOrgComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  isLoaded = false;
  photoIsLoading = false;
  org: Org;
  id: string;
  modules = {};
  message: string;

  constructor(private orgsService: OrgsService,
              private filesService: FilesService,
              private route: ActivatedRoute,
              private location: Location
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline'],        // toggled buttons
        ['blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean'],                                         // remove formatting button
        ['link']
      ],
    };
    this.subscription = this.orgsService.getOrg(+this.id)
      .subscribe((data) => {
        this.org = data['response'];
        this.isLoaded = true;
      });
  }

  onUpload(fileInput: any) {
    this.photoIsLoading = true;
    const file = <File>fileInput.target.files[0];
    const fb = new FormData();
    fb.append('file', file, file.name);
    this.filesService.addFile(fb).subscribe(event => {
        this.org.photo = event['response'];
        this.photoIsLoading = false;
      });

  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

  onSubmit(form: NgForm) {
    this.orgsService.editOrg(+this.id, form.value)
      .subscribe((data) => {
        if (data['response']) {
          this.message = 'Сохранения изменены!';
          setTimeout(() => {
            this.message = null;
          }, 5000);
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

}
