import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs/Subscription';
import {ReportsService} from '../../../shared/services/reports.service';
import {Report} from '../../../shared/models/report.model';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';
import {FilesService} from '../../../shared/services/files.service';
import {QuillEditorComponent} from 'ngx-quill';
import Delta from 'quill-delta';


@Component({
  selector: 'autotourism-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss'],
  animations: [ fadeStateTrigger ]
})
export class EditReportComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  subscription2: Subscription;
  id: string;
  message: string;
  @ViewChild('editor') editor: QuillEditorComponent;

  modules = {};
  formats = [
    'bold',
    'italic',
    'link',
    'size',
    'strike',
    'underline',
    'blockquote',
    'header',
    'indent',
    'list',
    'image'];
  isLoaded = false;
  report: Report;

  constructor(
    private reportService: ReportsService,
    private route: ActivatedRoute,
    private filesService: FilesService,
    private location: Location
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.subscription = this.reportService.getReport(+this.id)
      .subscribe((data) => {
        if (data['response']) {
          this.report = data['response'];
        } else {
          this.report = new Report(null, null, false);
        }
        this.isLoaded = true;
      });

    this.modules = {
      toolbar:
        [
          ['clean'],
          ['bold', 'italic', 'underline'],        // toggled buttons
          ['blockquote'],
          [{ 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link', 'image']
      ],
      clipboard: {
        matchVisual: false
      }
    };
  }

  addBindingCreated(event) {
    const toolbar = event.getModule('toolbar');
    toolbar.quill.theme.tooltip.textbox.className = 'browser-default';
    toolbar.quill.theme.tooltip.textbox.dataset.link = 'Вставьте ссылку и нажмите Enter';
    toolbar.quill.clipboard.addMatcher('span', function(node, delta) {
      return delta.compose(new Delta().insert(delta.length(), { color: '#000'}));
    });
    toolbar.quill.clipboard.addMatcher('a', function(node, delta) {
      return delta.compose(new Delta().insert(delta.length(), { color: false }));
    });
    toolbar.addHandler('image', this.onUpload.bind(null, toolbar, this));
  }

  onUpload(editor, component) {
    let fileInput = editor.container.querySelector('input.ql-image[type=file]');
    if (fileInput == null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
      fileInput.classList.add('ql-image');
      fileInput.addEventListener('change', function () {
        if (fileInput.files != null && fileInput.files[0] != null) {
          const file = <File>fileInput.files[0];
          const fb = new FormData();
          fb.append('file', file, file.name);
          component.filesService.addFile(fb).subscribe(event => {
            const range = editor.quill.getSelection(true);
            editor.quill.insertEmbed(range.index, 'image', event['response']);
            editor.quill.setSelection(range.index + 1);
          });
        }
      });
      editor.container.appendChild(fileInput);
    }
    fileInput.click();
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
    if (this.subscription2) { this.subscription2.unsubscribe(); }
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(form: NgForm) {
    this.subscription2 = this.reportService.editReport(+this.id, form.value)
      .subscribe((data) => {
        if (data['response']) {
          this.message = 'Изменения сохранены!';
          setTimeout(() => {
            this.message = null;
          }, 5000);
        }
      });
  }
}
