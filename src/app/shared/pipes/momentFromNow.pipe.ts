import {Pipe, PipeTransform} from '@angular/core';
import {TranslatesService} from '@shared/translates';
// declare const moment: any;
import * as moment from 'moment';

// const Moment: any = (<any>moment).default || moment;


@Pipe({
  name: 'momentFromNow',
})
export class MomentFromNowPipe implements PipeTransform {

  constructor(private _translatesService: TranslatesService) {
  }

  transform(value: string): string {
    moment.locale(this._translatesService.getCurrentLang());
    return moment.utc(value).fromNow().toString();
  }

}
