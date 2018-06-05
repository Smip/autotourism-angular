import {Pipe, PipeTransform} from "@angular/core";


@Pipe({
  name: 'autoPaginator'
})

export class PaginatorPipe implements PipeTransform {
  transform(items: string, page: number, itemsForPage: number = 5): any {
    return items.slice(page * itemsForPage - itemsForPage, page * itemsForPage);
  }

}
