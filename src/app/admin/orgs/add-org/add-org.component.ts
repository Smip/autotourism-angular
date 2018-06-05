import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Location} from '@angular/common';

import {OrgsService} from '../../../shared/services/orgs.service';
import {Org} from '../../../shared/models/org.model';
import {FilesService} from '../../../shared/services/files.service';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';


@Component({
  selector: 'autotourism-add-org',
  templateUrl: './add-org.component.html',
  styleUrls: ['./add-org.component.scss'],
  animations: [ fadeStateTrigger ]
})
export class AddOrgComponent implements OnInit, OnDestroy {


  subscription: Subscription;
  subscription2: Subscription;
  isLoaded = false;
  photoIsLoading = false;
  org: Org = new Org;
  id: string;
  modules = {};
  message: string;

  constructor(private orgsService: OrgsService,
              private filesService: FilesService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router
  ) { }

  ngOnInit() {
    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline'],        // toggled buttons
        ['blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean'],                                         // remove formatting button
        ['link']
      ],
    };
    this.isLoaded = true;
  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
    if(this.subscription2) this.subscription2.unsubscribe();
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

  onSubmit(form: NgForm) {
    this.subscription2 = this.orgsService.addOrg(form.value)
      .subscribe((data) => {
        if (data['response']) {
          this.router.navigate(['..', data['response']], {relativeTo: this.route});
        }
      });
  }

  goBack(): void {
    this.location.back();
  }

}
