import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockcategory'
})
export class StockcategoryPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if (value) {
      if (value >= 200000)
        return 'Mega Cap';
      else if (value >= 10000)
        return 'Large Cap';
      else if (value >= 2000)
          return 'Mid Cap';
      else if (value >= 50)
        return 'Micro Cap';
      else
        return 'Nano Cap';
    } else
      return 'n.a';
  }

}
