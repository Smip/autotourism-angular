import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {TranslateService} from "@ngx-translate/core";

@Pipe({
  name: 'autoMoment'
})

export class MomentPipe implements PipeTransform {

  constructor(private translate: TranslateService){}

  transform(value: string, formatFrom: string, formatTo: string = 'LL'): string {
    moment.locale(this.translate.currentLang);
    return moment(value, formatFrom).format(formatTo);
  }

}
