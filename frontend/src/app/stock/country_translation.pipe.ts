import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateCountry'
})
export class CountryTranslationPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value && args) {
      switch (args) {
        case 'de':
          return this.getTranslationDE(value);
        default:
          return value;
      }
    }
    return value;
  }
  
  getTranslationDE(value: string) {
    switch (value) {
      case 'UK':
        return 'Grossbritanien';
      case 'New Zealand':
        return 'Neuseeland';
      case 'Singapore':
        return 'Singapur';
      case 'Japan':
        return 'Japan';
      case 'China inc HK':
        return 'China inkl. Hong-Kong';
      case 'Germany':
        return 'Deutschland';
      case 'Austria':
        return 'Östereich';
      default:
        return value;
    }
  }

}
