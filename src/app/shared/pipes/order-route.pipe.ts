import {Pipe, PipeTransform} from '@angular/core';
import {Route} from '../models/route.model';
import * as moment from 'moment';

@Pipe({
  name: 'orderRoute'
})
export class OrderRoutePipe implements PipeTransform {

  transform(route: Route[]): any {
    if (route.length === 0 ) {
      return route;
    }
    return route.sort((point1, point2) => {
      if (moment(point1.date_from) < moment(point2.date_from)) {
        return -1;
      } else if (moment(point1.date_from) > moment(point2.date_from)) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
