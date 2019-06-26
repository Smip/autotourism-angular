import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'keys',
})
export class KeysPipe implements PipeTransform {

  transform(value: object): string[] | number[] {
    return Object.keys(value);
  }

}
