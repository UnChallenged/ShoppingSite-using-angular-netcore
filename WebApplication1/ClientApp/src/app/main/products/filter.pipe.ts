import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, searchValue): any {
    if (!searchValue) return value;
    return value.filter((v) =>
     // v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
      v.productName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}
