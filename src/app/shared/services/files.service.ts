import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {BaseApi} from '@shared/services/base-api';


@Injectable()
export class FilesService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addFile(data: FormData): Observable<any> {
    return this.post('admin/file', data);
  }

  addFileFromLink(link: string): Observable<any> {
    return this.post('admin/filelink', {file: link});
  }


}
