import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lista'
})
export class ListaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
