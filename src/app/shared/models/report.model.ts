export class Report {
  constructor(public article: string = '',
              public date?: string,
              public posted: boolean = false,
              public id?: number) {
  }
}
