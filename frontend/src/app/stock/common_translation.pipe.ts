import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateCommon'
})
export class CommonTranslationPipe implements PipeTransform {

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
      case 'Stocks':
        return 'Aktien';
      case 'Indices':
        return 'Indizes';
      case 'Lists':
        return 'Listen';
      case 'Stock screener':
        return 'Aktien-Suche';
      case 'Advisor':
        return 'Ratgeber';
      case 'The sum of the factors has to be 100 (actual: ':
        return 'Summe der Faktoren muss 100 betragen (aktuell: ';
      case 'Information':
        return 'Hinweis';
      case 'Contacts':
        return 'Kontakt';
      case 'Profile settings':
        return 'Profil-Einstellungen';
      case 'Change Password':
        return 'Passwort wechseln';
      default:
        return value;
    }
  }

}
