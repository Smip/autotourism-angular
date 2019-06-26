import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

import Quill from 'quill';
import Delta from 'quill-delta';
import {ImageUpload} from 'quill-image-upload';
import {ImageDrop} from 'quill-image-drop-module';
import {FilesService} from '@shared/services/files.service';

Quill.register('modules/imageUpload', ImageUpload);

Quill.register('modules/imageDrop', ImageDrop);

@Injectable({
  providedIn: 'root',
})
export class QuillService {

  constructor(
    private _files: FilesService,
  ) {
  }

  modules() {
    const modules = {
      toolbar:
        {
          container: [
            ['clean'],
            ['bold', 'italic', 'underline'],
            ['blockquote'],
            [{'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link', 'image'],
          ],
        },
      clipboard: {
        matchVisual: false,
        matchers: [
          ['h1', this.headerCleaner],
          ['h2', this.headerCleaner],
          ['h3', this.headerCleaner],
          ['h4', this.headerCleaner],
          ['h5', this.headerCleaner],
          ['h6', this.headerCleaner],
          ['p', this.pCleaner],
          ['a', this.aCleaner],
          ['ul', this.pCleaner],
          ['img', this.imgCleaner.bind(this)],
          [Node.TEXT_NODE, this.textCleaner],
        ],
      },
      imageDrop: {
        handler: this.upload.bind(this),
      },
      imageUpload: {
        customUploader: (file, next) => {
          console.log(file);
          const fb = new FormData();
          fb.append('file', file, file.name);
          this._files.addFile(fb).subscribe(response => {
            next(response.file);
          });
        },
        checkBeforeSend: (file, next) => {
          next(file); // go back to component and send to the server
        },
      },
    };
    return modules;
  }

  textCleaner(node, delta) {
    const newDelta = new Delta(delta
      .filter((op) => typeof op.insert === 'string')
      .map((op) => ({insert: op.insert})));
    // console.log('textCleaner', delta, delta.diff(newDelta));
    return newDelta;
  }

  headerCleaner(node, delta) {
    const newDelta = new Delta(delta
      .filter((op) => typeof op.insert === 'string' && op.insert !== '\n')
      .map((op) => {
        return {insert: op.insert, attributes: {header: 2}};
      }),
    );
    // console.log('headerCleaner', delta, delta.diff(newDelta));
    return newDelta;
  }

  pCleaner(node, delta) {
    const allowAttrs = ['italic', 'bold', 'link', 'underline', 'header', 'list'];
    const newDelta = new Delta(delta
      .map((op) => {
        if ('attributes' in op) {
          // console.table(op.attributes);
          Object.keys(op.attributes).forEach((key) => allowAttrs.includes(key) || delete op.attributes[key]);
        }
        return op;
      }),
    );
    // console.log('pCleaner', delta, delta.diff(newDelta));
    return newDelta;
  }

  aCleaner(node, delta) {
    const imgDelta = delta
      .filter((op) => typeof op.insert === 'object' && !!op.insert['image']);
    if (imgDelta.length) {
      const newDelta = new Delta().insert('\n').insert(imgDelta[0].insert).insert('\n');
      // console.log('aCleaner', delta, delta.diff(newDelta));
      return newDelta;
    }
    return delta;
  }

  imgCleaner(node, delta) {
    const domainReGex = /^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i;
    const imgUrlMatch = node.src.match(domainReGex);
    const imgDomain = imgUrlMatch && imgUrlMatch[1];
    const backendUrlMatch = environment.apiURL.match(domainReGex);
    const backendDomain = backendUrlMatch && backendUrlMatch[1];
    if (imgDomain !== backendDomain) {
      this._files.addFileFromLink(node.src).subscribe(response => {
        if (response['file']) {
          const src = node.src;
          const no = document.querySelectorAll(`[src="${src}"]`);
          (<HTMLImageElement>no[0]).src = response['file'];
        }
      });
      const newDelta = new Delta().insert('\n').insert(delta.ops[delta.length() - 1].insert).insert('\n');
      // console.log('imgCleaner', delta, delta.diff(newDelta));
      return newDelta;
    }
    return delta;
  }


  upload(file, callback) {
    const fb = new FormData();
    fb.append('file', file, file.name);
    this._files.addFile(fb).subscribe(response => {
      callback(response.file);
    });
  }

}
