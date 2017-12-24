import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateCommon'
})
export class CommonTranslationPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(value: string, locale?: string): any {
    if (value && (locale || this.locale)) {
      switch (locale || this.locale) {
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
      case 'Home':
        return 'Startseite';
      case 'No records found':
        return 'Keine Einträge gefunden';
      case 'Buy':
        return 'Kaufen';
      case 'Sell':
        return 'Verkaufen';
      case 'Hold':
        return 'Halten';
      case '(12 months) to':
        return '(12 Monate) nach';
      case '(6 months)':
        return '(6 Monate)';
      case 'This years observation period':
        return 'Diesjährige Beobachtungsperiode';
      case 'Last years observation period':
        return 'Letztjährige Beobachtungsperiode';
      case 'Operating cashflow':
        return 'Cashflow-Rendite';
      case 'Return on assets':
        return 'Nettorendite';
      case 'month':
        return 'Monat';
      default:
        return value;
    }
  }

}
