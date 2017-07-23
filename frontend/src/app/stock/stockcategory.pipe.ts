import { Pipe, PipeTransform } from '@angular/core';

import { Levermann } from './levermann';

@Pipe({
  name: 'stockcategory'
})
export class StockcategoryPipe implements PipeTransform {

  transform(value: Levermann, args?: any): any {
    if (value.marketCapitalization) {
      if (value.marketCapitalization >= 200000)
        return 'Mega Cap';
      else if (value.marketCapitalization >= 10000)
        return 'Large Cap';
      else if (value.marketCapitalization >= 2000)
          return 'Mid Cap';
      else if (value.marketCapitalization >= 50)
        return 'Micro Cap';
      else
        return 'Nano Cap';
    } else
      return 'n.a';
  }

}
