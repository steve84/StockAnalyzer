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
      case 'Argentina':
        return 'Argentinien';
      case 'Australia':
        return 'Australien';
      case 'Austria':
        return 'Österreich';
      case 'Bangladesh':
        return 'Bangladesh';
      case 'Belgium':
        return 'Belgien';
      case 'Belize':
        return 'Belize';
      case 'Bermuda':
        return 'Bermuda';
      case 'Brazil':
        return 'Brasilien';
      case 'Canada':
        return 'Kanada';
      case 'China inc HK':
        return 'China/Hong Kong';
      case 'Cyprus':
        return 'Zypern';
      case 'Czech Republic':
        return 'Tschechien';
      case 'Denmark':
        return 'Dänemark';
      case 'Egypt':
        return 'Ägypten';
      case 'Falkland Islands':
        return 'Falklandinseln';
      case 'Finland':
        return 'Finnland';
      case 'France':
        return 'Frankreich';
      case 'Germany':
        return 'Deutschland';
      case 'Greece':
        return 'Griechenland';
      case 'Hungary':
        return 'Ungarn';
      case 'India':
        return 'Indien';
      case 'Indonesia':
        return 'Indonesien';
      case 'Ireland':
        return 'Irland';
      case 'Israel':
        return 'Israel';
      case 'Italy':
        return 'Italien';
      case 'Japan':
        return 'Japan';
      case 'Kazakhstan':
        return 'Kasachstan';
      case 'Kenya':
        return 'Kenia';
      case 'Korea':
        return 'Korea';
      case 'Luxembourg':
        return 'Luxemburg';
      case 'Malaysia':
        return 'Malaysia';
      case 'Mexico':
        return 'Mexiko';
      case 'Mongolia':
        return 'Mongolei';
      case 'Myanmar':
        return 'Myanmar';
      case 'Netherlands':
        return 'Niederlande';
      case 'New Zealand':
        return 'Neuseeland';
      case 'Nigeria':
        return 'Nigeria';
      case 'Norway':
        return 'Norwegen';
      case 'Peru':
        return 'Peru';
      case 'Philippines':
        return 'Philippinen';
      case 'Poland':
        return 'Polen';
      case 'Portugal':
        return 'Portugal';
      case 'Russia':
        return 'Russland';
      case 'Singapore':
        return 'Singapure';
      case 'South Africa':
        return 'Südafrika';
      case 'Spain':
        return 'Spanien';
      case 'Sweden':
        return 'Schweden';
      case 'Switzerland':
        return 'Schweiz';
      case 'Taiwan':
        return 'Taiwan';
      case 'Tanzania':
        return 'Tansania';
      case 'Thailand':
        return 'Thailand';
      case 'Turkey':
        return 'Türkei';
      case 'UK':
        return 'Grossbritannien';
      case 'Ukraine':
        return 'Ukraine';
      case 'United Arab Emirates':
        return 'Vereinigte Arabische Emirate';
      case 'USA':
        return 'USA';
      case 'Vietnam':
        return 'Vietnam';
      case 'Zambia':
        return 'Zambia';
      case 'Zimbabwe':
        return 'Zimbabwe';
      default:
        return value;
    }
  }

}
