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
      case 'Stock List':
        return 'Aktien-Liste';
      case 'Index List':
        return 'Index-Liste';
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
      case 'Compare selection':
        return 'Auswahl vergleichen';
      case 'Cancel selection':
        return 'Auswahl aufheben';
      // Wizard
      case 'Pure Levermann':
        return 'Levermann';
      case 'Pure Magic Formula':
        return 'Magic Formula';
      case 'Pure Piotroski F-Score':
        return 'Piotroski F-Score';
      case 'Levermann + Magic Formula':
        return 'Levermann + Magic Formula';
      case 'Levermann + Piotroski F-Score':
        return 'Levermann + Piotroski F-Score';
      case 'Magic Formula + Piotroski F-Score':
        return 'Magic Formula + Piotroski F-Score';
      case 'All':
        return 'Alle';
      case 'Asset class':
        return 'Anlageklasse';
      case 'Strategy':
        return 'Strategie';
      case 'Countries/Regions':
        return 'Länder/Regionen';
      case 'Branches':
        return 'Branchen';
      case 'Company sizes':
        return 'Unternehmensgrössen';
      case 'Result':
        return 'Auswertung';
      default:
        return value;
    }
  }

}
