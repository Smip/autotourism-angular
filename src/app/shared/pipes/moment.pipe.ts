import {Pipe, PipeTransform} from '@angular/core';
import {TranslatesService} from '@shared/translates';
// declare const moment: any;
import * as moment from 'moment';

// const Moment: any = (<any>moment).default || moment;

@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {

  constructor(private _translatesService: TranslatesService) {
  }

  transform(value: string, formatTo: string = 'YYYY-MM-DD HH:mm:ss'): string {
    moment.locale(this._translatesService.getCurrentLang());
    return moment.utc(value).local().format(formatTo);
  }

}
