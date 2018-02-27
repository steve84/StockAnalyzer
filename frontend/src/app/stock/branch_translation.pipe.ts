import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateBranch'
})
export class BranchTranslationPipe implements PipeTransform {

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
      case 'Advertising - marketing - media - e-commerce':
        return 'Werbung - Marketing';
      case 'Aerospace':
        return 'Luft -und Raumfahrt';
      case 'Agribusiness agriculture and fishing':
        return 'Agroindustrie, Landwirtschaft und Fischerei';
      case 'Agricultural chemicals and fertilisers':
        return 'Agrochemikalien und Düngemittel';
      case 'Airlines':
        return 'Airlines';
      case 'Airports':
        return 'Flughäfen';
      case 'Architectural and design services':
        return 'Architektur- und Designdienstleistungen';
      case 'Auto parts and components':
        return 'Autoteile und Komponenten';
      case 'Banking':
        return 'Banking';
      case 'Beverage manufacturers':
        return 'Getränkehersteller';
      case 'Building and construction materials':
        return 'Baumaterialien';
      case 'Business services':
        return 'Geschäftsdienstleistungen';
      case 'Cables, wires and transmission':
        return 'Kabel, Drähte und Getriebe';
      case 'Car truck and bus manufacturers':
        return 'Pkw-, Lkw- und Bushersteller';
      case 'Cement and concrete':
        return 'Zement und Beton';
      case 'Chemicals and petrochemicals':
        return 'Chemikalien und Petrochemikalien';
      case 'Clothing and shoe manufacturers':
        return 'Kleider- und Schuhhersteller';
      case 'Clothing wholesale and retail':
        return 'Bekleidung, Gross- und Einzelhandel';
      case 'Coal and coal products':
        return 'Kohle und Kohleprodukte';
      case 'Communication and networking equipment':
        return 'Kommunikations- und Netzwerkgeräte';
      case 'Computers phones and devices':
        return 'Computer, Telefone und Geräte';
      case 'Construction - industrial and diversified':
        return 'Baugewerbe (industriell)';
      case 'Construction - residential':
        return 'Baugewerbe (privat)';
      case 'Cosmetics jewellery and luxury products':
        return 'Kosmetik, Schmuck und Luxusprodukte';
      case 'Cycles and motorcycles':
        return 'Fahr- und Motorräder';
      case 'Defence products':
        return 'Verteidigungsprodukte';
      case 'Diversified conglomerates':
        return 'Mischkonzerne (diversifiziert)';
      case 'Diversified industrial':
        return 'Industrie (diversifiziert)';
      case 'Diversified real estate':
        return 'Immobilien (diversifiziert)';
      case 'Diversified telecommunications':
        return 'Telekommunikation (diversifiziert)';
      case 'Diversified utilities':
        return 'Hilfsmittel';
      case 'Diversified wholesale and retail':
        return 'Gross- und Einzelhandel';
      case 'Education':
        return 'Bildung';
      case 'Electrical equipment':
        return 'Elektrisches Material';
      case 'Electricity distribution and generation':
        return 'Stromverteilung und Erzeugung';
      case 'Electronic components':
        return 'Elektronische Komponenten';
      case 'Electronic finished products':
        return 'Elektronische Fertigprodukte';
      case 'Engineering and technical services':
        return 'Engineering and technische Dienstleistungen';
      case 'Engines and heavy machinery':
        return 'Motoren und schwere Maschinen';
      case 'Entertainment and broadcasting':
        return 'Unterhaltung und TV-Übertragung';
      case 'Fabricated metal and composite products':
        return 'Metall- und Verbundprodukte';
      case 'Financial services':
        return 'Finanzdienstleistungen';
      case 'Food manufacturers':
        return 'Lebensmittelhersteller';
      case 'Forestry and timber':
        return 'Holz- und Forstwirtschaft';
      case 'Funeral services':
        return 'Bestattungsdienste';
      case 'Furniture and furnishings':
        return 'Möbel und Einrichtungen';
      case 'Gas and water utilities':
        return 'Gas- und Wasserversorgungsunternehmen';
      case 'Glass and glass products':
        return 'Glas und Glasprodukte';
      case 'Healthcare products':
        return 'Gesundheitsprodukte';
      case 'Healthcare real estate':
        return 'Gesundheitswesen (Immobilien)';
      case 'Healthcare services':
        return 'Gesundheitsdienstleistungen';
      case 'High precision and instrumentation products':
        return 'Präzisions- und Instrumentierungsprodukte';
      case 'Hotels travel and leisure':
        return 'Hotels, Reisen und Freizeit';
      case 'Household appliances and hardware':
        return 'Hausgerätetechnik und Haushaltsgeräte';
      case 'Household consumables manufacturers':
        return 'Haushaltsverbrauchsmaterial (Hersteller)';
      case 'HR and recruitment':
        return 'Personalwesen und Rekrutierung';
      case 'Image processing':
        return 'Bildverarbeitung';
      case 'Industrial components':
        return 'Industrielle Komponenten';
      case 'Industrial equipment and light machinery':
        return 'Industrieanlagen und leichte Maschinen';
      case 'Industrial gases':
        return 'Industriegase';
      case 'Infrastructure construction and services':
        return 'Infrastruktur, Bau und Dienstleistungen';
      case 'Insurance - broking':
        return 'Versicherung (Vermittlung)';
      case 'Insurance - general':
        return 'Versicherung (allgemein)';
      case 'Insurance - life and health':
        return 'Versicherung (Leben und Gesundheit)';
      case 'Internet and networking services':
        return 'Internet- und Netzwerkdienste';
      case 'Internet service providers':
        return 'Internetdienstanbieter';
      case 'Lighting equipment':
        return 'Beleuchtungsanlagen';
      case 'Marine, salvage, dredging, offshore services':
        return '';
      case 'Medical equipment':
        return 'Medizinische Ausrüstung';
      case 'Metals and minerals mining and exploration':
        return 'Bergbau und Schürfung';
      case 'Miscellaneous consumer services':
        return 'Verschiedene Verbraucherdienste';
      case 'Music instruments and suppllies':
        return 'Musikinstrumente und Zubehör';
      case 'Non-ferrous metals production and products':
        return 'Nichteisenmetallerzeugung und Produkte';
      case 'Office commercial and industrial real estate':
        return 'Büro-, Gewerbe- und Industrieimmobilien';
      case 'Office equipment and supplies non-IT':
        return 'Büroausstattung und Zubehör Nicht-IT';
      case 'Oil and gas':
        return 'Öl und Gas';
      case 'Oil and gas drilling and exploration':
        return 'Öl und Gas (Bohrung und Erkundung)';
      case 'Oil and gas equipment and services':
        return 'Öl und Gas (Ausrüstung und Dienstleistungen)';
      case 'Online retailers':
        return 'Online-Händler';
      case 'Packaging':
        return 'Verpackungen';
      case 'Paints and coatings':
        return 'Farben und Beschichtungen';
      case 'Paper products (not packaging)':
        return 'Papierprodukte (nicht Verpackung)';
      case 'Petroleum refiners and distributors':
        return 'Erdölraffinerien und -verteiler';
      case 'Pharmaceuticals and biosciences':
        return 'Pharmazeutika und Biowissenschaften';
      case 'Pipelines and energy storage':
        return 'Pipelines und Energiespeicher';
      case 'Power nuclear and heavy engineering':
        return 'Energie-, Nuklear- und Schwermaschinenbau';
      case 'Professional services and consulting':
        return 'Dienstleistungen und Beratung';
      case 'Publishing and printing':
        return 'Veröffentlichung und Druck';
      case 'Quarrying and aggregates':
        return '';
      case 'Railroads and bus services':
        return 'Eisenbahn- und Busdienste';
      case 'Railway stock and equipment':
        return 'Eisenbahnmaterial und Ausrüstung';
      case 'Real estate services':
        return 'Immobiliendienstleistungen';
      case 'Reinsurance':
        return 'Rückversicherer';
      case 'Research and specialist materials':
        return 'Forschungs- und Fachmaterialien';
      case 'Residential real estate':
        return 'Wohnimmobilien';
      case 'Restaurants':
        return 'Restaurants';
      case 'Retail and malls real estate':
        return 'Immobilien (Einzelhandel und Einkaufszentren)';
      case 'Roads tolls and traffic management':
        return 'Strassenmaut und Verkehrsmanagement';
      case 'Rubber and plastics':
        return 'Gummi und Kunststoffe';
      case 'Search cloud and integrated IT services':
        return 'Such-, Cloud- und integrierte IT-Services';
      case 'Sector holding companies':
        return 'Holdinggesellschaften';
      case 'Security products and services':
        return 'Sicherheitprodukte und Dienstleistungen';
      case 'Shipbuilding':
        return 'Schiffbau';
      case 'Shipping':
        return 'Versand';
      case 'Software providers':
        return 'Softwareanbieter';
      case 'Specialist chemicals':
        return 'Spezialchemikalien';
      case 'Sports equipment manufacturers and retailers':
        return 'Sportgerätehersteller und -händler';
      case 'Steel production and products':
        return 'Stahlproduktion und Produkte';
      case 'Supermarkets':
        return 'Supermärkte';
      case 'Textiles':
        return 'Textilien';
      case 'Tire manufacturers':
        return 'Reifenhersteller';
      case 'Tobacco':
        return 'Tabak';
      case 'Transport logistics and distribution':
        return 'Transport, Logistik und Vertrieb';
      case 'Vehicle hiring and leasing':
        return 'Fahrzeugvermietung und Leasing';
      case 'Vehicle sales and repair':
        return 'Fahrzeugverkauf und Reparatur';
      case 'Waste and water management':
        return 'Abfall- und Gewässerbewirtschaftung';
      // groups
      case 'Chemicals':
        return 'Chemie';
      case 'Conglomerates':
        return 'Mischkonzern';
      case 'Construction':
        return 'Baugewerbe';
      case 'Consumer':
        return 'Verbraucherartikel';
      case 'Electrical, electronic':
        return 'Elektronik, Elektrik';
      case 'Healthcare':
        return 'Gesundheitswesen';
      case 'Industrial':
        return 'Industrie';
      case 'IT':
        return 'IT';
      case 'Media, publishing':
        return 'Medien, Verlagswesen';
      case 'Primary production':
        return 'Rohstoffproduktion';
      case 'Real estate':
        return 'Immobilien';
      case 'Services':
        return 'Dienstleistungen';
      case 'Technology':
        return 'Technologie';
      case 'Telecommunications':
        return 'Telekommunikation';
      case 'Transport':
        return 'Transport';
      case 'Utilities':
        return 'Hilfsmittel';
      case 'Vehicles':
        return 'Fahrzeuge';
      case 'Welfare and community':
        return 'Sozialwesen und Gemeinwesen';
      case 'All':
        return 'Alle';
      default:
        return value;
    }
  }

}
