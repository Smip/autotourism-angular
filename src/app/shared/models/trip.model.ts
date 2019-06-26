import {Route} from './route.model';
import {Member} from '@shared/models/member.model';
import {Report} from '@shared/models/report.model';

export class Trip {
  constructor(public type: string = 'draft',
              public name?: string,
              public number?: number,
              public date_from?: string,
              public date_until?: string,
              public registration_open_from?: string,
              public registration_open_to?: string,
              public link_to_registration?: string,
              public trip_routes?: Route[],
              public members?: Member[],
              public members_number?: number,
              public trip_report?: boolean,
              public trip_report_posted?: boolean,
              public report?: Report,
              public id?: number) {
  }
}
