import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'autoMoment'
})

export class MomentPipe implements PipeTransform {
  transform(value: string, formatFrom: string, formatTo: string = 'LL'): string {
    moment.locale('ru');
    return moment(value, formatFrom).format(formatTo);
  }

}
