export class Organizer {
  constructor(
    public photo: string = '',
    public name: string = '',
    public nick: string = '',
    public description: string = '',
    public lastUpdate?: string,
    public id?: number,
  ) {
  }
}
