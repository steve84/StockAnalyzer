import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toRegion'
})
export class RegionPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(value: string, locale?: string): any {
    if (value && (locale || this.locale)) {
      switch (locale || this.locale) {
        case 'de':
          return this.getTranslationDE(this.getRegion(value));
        default:
          return this.getRegion(value);
      }
    }
    return value;
  }
  
  getRegion(countryName: string) {
    switch (countryName) {
      case 'Argentina':
      case 'Brazil':
      case 'Mexico':
      case 'Peru':
      case 'Falkland Islands':
        return 'South America';

      case 'Australia':
      case 'New Zealand':
        return 'Oceania';

      case 'Austria':
      case 'Belgium':
      case 'Czech Republic':
      case 'Denmark':
      case 'Finland':
      case 'France':
      case 'Germany':
      case 'Greece':
      case 'Hungary':
      case 'Italy':
      case 'Luxembourg':
      case 'Netherlands':
      case 'Norway':
      case 'Poland':
      case 'Portugal':
      case 'Russia':
      case 'Spain':
      case 'Sweden':
      case 'Switzerland':
      case 'Turkey':
      case 'UK':
      case 'Ukraine':
      case 'Cyprus':
      case 'Ireland':
        return 'Europe';
        
      case 'Canada':
      case 'USA':
      case 'Bermuda':
        return 'Northern America';
      
      case 'Egypt':
      case 'Kenya':
      case 'Nigeria':
      case 'South Africa':
      case 'Tanzania':
      case 'Zambia':
      case 'Zimbabwe':
        return 'Africa';
      
      case 'Bangladesh':
      case 'China inc HK':
      case 'India':
      case 'Indonesia':
      case 'Japan':
      case 'Kazakhstan':
      case 'Korea':
      case 'Malaysia':
      case 'Mongolia':
      case 'Myanmar':
      case 'Philippines':
      case 'Singapore':
      case 'Taiwan':
      case 'Thailand':
      case 'Vietnam':
        return 'Asia';
      
      case 'Belize':
        return 'Central America'

      case 'Israel':
      case 'United Arab Emirates':
        return 'Middle East';
      
      case 'World':
        return 'World';
      
      default:
        return 'Others';
    }
  }
  
  getTranslationDE(value: string) {
    switch (value) {
      case 'Africa':
        return 'Afrika';
      case 'Asia':
        return 'Asien';
      case 'Central America':
        return 'Zentralamerika';
      case 'Europe':
        return 'Europa';
      case 'Middle East':
        return 'Mittlerer Osten';
      case 'North America':
        return 'Nordamerika';
      case 'Oceania':
        return 'Ozeanien';
      case 'South America':
        return 'Südamerika';
      case 'The Caribbean':
        return 'Karibik';
      case 'World':
        return 'Welt';
      default:
        return 'Andere';
    }
  }

}
