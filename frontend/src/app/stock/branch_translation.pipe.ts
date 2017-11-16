import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateBanch'
})
export class BranchTranslationPipe implements PipeTransform {

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
      case 'advertising - marketing - media - e-commerce':
        return 'Werbung - Marketing';
      case 'aerospace':
        return 'Luft -und Raumfahrt';
      case 'agribusiness agriculture and fishing':
        return 'Agroindustrie, Landwirtschaft und Fischerei';
      case 'agricultural chemicals and fertilisers':
        return 'Agrochemikalien und Düngemittel';
      case 'airlines':
        return 'Airlines';
      case 'airports':
        return 'Flughäfen';
      case 'architectural and design services':
        return 'Architektur- und Designdienstleistungen';
      case 'auto parts and components':
        return 'Autoteile und Komponenten';
      case 'banking':
        return 'Banking';
      case 'beverage manufacturers':
        return 'Getränkehersteller';
      case 'building and construction materials':
        return 'Baumaterialien';
      case 'business services':
        return 'Geschäftsdienstleistungen';
      case 'cables, wires and transmission':
        return 'Kabel, Drähte und Getriebe';
      case 'car truck and bus manufacturers':
        return 'Pkw-, Lkw- und Bushersteller';
      case 'cement and concrete':
        return 'Zement und Beton';
      case 'chemicals and petrochemicals':
        return 'Chemikalien und Petrochemikalien';
      case 'clothing and shoe manufacturers':
        return 'Kleider- und Schuhhersteller';
      case 'clothing wholesale and retail':
        return 'Bekleidung, Gross- und Einzelhandel';
      case 'coal and coal products':
        return 'Kohle und Kohleprodukte';
      case 'communication and networking equipment':
        return 'Kommunikations- und Netzwerkgeräte';
      case 'computers phones and devices':
        return 'Computer, Telefone und Geräte';
      case 'construction - industrial and diversified':
        return 'Baugewerbe (industriell)';
      case 'construction - residential':
        return 'Baugewerbe (privat)';
      case 'cosmetics jewellery and luxury products':
        return 'Kosmetik, Schmuck und Luxusprodukte';
      case 'cycles and motorcycles':
        return 'Fahr- und Motorräder';
      case 'defence products':
        return 'Verteidigungsprodukte';
      case 'diversified conglomerates':
        return 'Mischkonzerne (diversifiziert)';
      case 'diversified industrial':
        return 'Industrie (diversifiziert)';
      case 'diversified real estate':
        return 'Immobilien (diversifiziert)';
      case 'diversified telecommunications':
        return 'Telekommunikation (diversifiziert)';
      case 'diversified utilities':
        return 'Hilfsmittel';
      case 'diversified wholesale and retail':
        return 'Gross- und Einzelhandel';
      case 'education':
        return 'Bildung';
      case 'electrical equipment':
        return 'Elektrisches Material';
      case 'electricity distribution and generation':
        return 'Stromverteilung und Erzeugung';
      case 'electronic components':
        return 'Elektronische Komponenten';
      case 'electronic finished products':
        return 'Elektronische Fertigprodukte';
      case 'engineering and technical services':
        return 'Engineering and technische Dienstleistungen';
      case 'engines and heavy machinery':
        return 'Motoren und schwere Maschinen';
      case 'entertainment and broadcasting':
        return 'Unterhaltung und TV-Übertragung';
      case 'fabricated metal and composite products':
        return 'Metall- und Verbundprodukte';
      case 'financial services':
        return 'Finanzdienstleistungen';
      case 'food manufacturers':
        return 'Lebensmittelhersteller';
      case 'forestry and timber':
        return 'Holz- und Forstwirtschaft';
      case 'funeral services':
        return 'Bestattungsdienste';
      case 'furniture and furnishings':
        return 'Möbel und Einrichtungen';
      case 'gas and water utilities':
        return 'Gas- und Wasserversorgungsunternehmen';
      case 'glass and glass products':
        return 'Glas und Glasprodukte';
      case 'healthcare products':
        return 'Gesundheitsprodukte';
      case 'healthcare real estate':
        return 'Gesundheitswesen (Immobilien)';
      case 'healthcare services':
        return 'Gesundheitsdienstleistungen';
      case 'high precision and instrumentation products':
        return 'Präzisions- und Instrumentierungsprodukte';
      case 'hotels travel and leisure':
        return 'Hotels, Reisen und Freizeit';
      case 'household appliances and hardware':
        return 'Hausgerätetechnik und Haushaltsgeräte';
      case 'household consumables manufacturers':
        return 'Haushaltsverbrauchsmaterial (Hersteller)';
      case 'HR and recruitment':
        return 'Personalwesen und Rekrutierung';
      case 'image processing':
        return 'Bildverarbeitung';
      case 'industrial components':
        return 'Industrielle Komponenten';
      case 'industrial equipment and light machinery':
        return 'Industrieanlagen und leichte Maschinen';
      case 'industrial gases':
        return 'Industriegase';
      case 'infrastructure construction and services':
        return 'Infrastruktur, Bau und Dienstleistungen';
      case 'insurance - broking':
        return 'Versicherung (Vermittlung)';
      case 'insurance - general':
        return 'Versicherung (allgemein)';
      case 'insurance - life and health':
        return 'Versicherung (Leben und Gesundheit)';
      case 'internet and networking services':
        return 'Internet- und Netzwerkdienste';
      case 'internet service providers':
        return 'Internetdienstanbieter';
      case 'lighting equipment':
        return 'Beleuchtungsanlagen';
      case 'marine, salvage, dredging, offshore services':
        return '';
      case 'medical equipment':
        return 'Medizinische Ausrüstung';
      case 'metals and minerals mining and exploration':
        return 'Bergbau und Schürfung';
      case 'miscellaneous consumer services':
        return 'Verschiedene Verbraucherdienste';
      case 'music instruments and suppllies':
        return 'Musikinstrumente und Zubehör';
      case 'non-ferrous metals production and products':
        return 'Nichteisenmetallerzeugung und Produkte';
      case 'office commercial and industrial real estate':
        return 'Büro-, Gewerbe- und Industrieimmobilien';
      case 'office equipment and supplies non-IT':
        return 'Büroausstattung und Zubehör Nicht-IT';
      case 'oil and gas':
        return 'Öl und Gas';
      case 'oil and gas drilling and exploration':
        return 'Öl und Gas (Bohrung und Erkundung)';
      case 'oil and gas equipment and services':
        return 'Öl und Gas (Ausrüstung und Dienstleistungen)';
      case 'online retailers':
        return 'Online-Händler';
      case 'packaging':
        return 'Verpackungen';
      case 'paints and coatings':
        return 'Farben und Beschichtungen';
      case 'paper products (not packaging)':
        return 'Papierprodukte (nicht Verpackung)';
      case 'petroleum refiners and distributors':
        return 'Erdölraffinerien und -verteiler';
      case 'pharmaceuticals and biosciences':
        return 'Pharmazeutika und Biowissenschaften';
      case 'pipelines and energy storage':
        return 'Pipelines und Energiespeicher';
      case 'power nuclear and heavy engineering':
        return 'Energie-, Nuklear- und Schwermaschinenbau';
      case 'professional services and consulting':
        return 'Dienstleistungen und Beratung';
      case 'publishing and printing':
        return 'Veröffentlichung und Druck';
      case 'quarrying and aggregates':
        return '';
      case 'railroads and bus services':
        return 'Eisenbahn- und Busdienste';
      case 'railway stock and equipment':
        return 'Eisenbahnmaterial und Ausrüstung';
      case 'real estate services':
        return 'Immobiliendienstleistungen';
      case 'reinsurance':
        return 'Rückversicherer';
      case 'research and specialist materials':
        return 'Forschungs- und Fachmaterialien';
      case 'residential real estate':
        return 'Wohnimmobilien';
      case 'restaurants':
        return 'Restaurants';
      case 'retail and malls real estate':
        return 'Immobilien (Einzelhandel und Einkaufszentren)';
      case 'roads tolls and traffic management':
        return 'Strassenmaut und Verkehrsmanagement';
      case 'rubber and plastics':
        return 'Gummi und Kunststoffe';
      case 'search cloud and integrated IT services':
        return 'Such-, Cloud- und integrierte IT-Services';
      case 'sector holding companies':
        return 'Holdinggesellschaften';
      case 'security products and services':
        return 'Sicherheitprodukte und Dienstleistungen';
      case 'shipbuilding':
        return 'Schiffbau';
      case 'shipping':
        return 'Versand';
      case 'software providers':
        return 'Softwareanbieter';
      case 'specialist chemicals':
        return 'Spezialchemikalien';
      case 'sports equipment manufacturers and retailers':
        return 'Sportgerätehersteller und -händler';
      case 'steel production and products':
        return 'Stahlproduktion und Produkte';
      case 'supermarkets':
        return 'Supermärkte';
      case 'textiles':
        return 'Textilien';
      case 'tire manufacturers':
        return 'Reifenhersteller';
      case 'tobacco':
        return 'Tabak';
      case 'transport logistics and distribution':
        return 'Transport, Logistik und Vertrieb';
      case 'vehicle hiring and leasing':
        return 'Fahrzeugvermietung und Leasing';
      case 'vehicle sales and repair':
        return 'Fahrzeugverkauf und Reparatur';
      case 'waste and water management':
        return 'Abfall- und Gewässerbewirtschaftung';
      default:
        return value;
    }
  }

}
