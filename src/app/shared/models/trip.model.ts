import {Route} from "./route.model";

export class Trip {
  constructor(public number: number,
              public name: string,
              public date_from: string,
              public date_until: string,
              public type: string,
              public registration_open_from: string,
              public registration_open_to: string,
              public link_to_registration: string,
              public route: Route[],
              public members_number: number,
              public report: boolean,
              public id?: number) {
  }
}
