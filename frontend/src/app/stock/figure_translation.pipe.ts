import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'translateFigure'
})
export class FigureTranslationPipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(value: string, locale?: string): string {
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
      case 'Current Assets':
        return 'Kurzfristiges Vermögen';
      case 'Total Assets':
        return 'Bilanzsumme';
      case 'Goodwill':
        return 'Geschäfts -oder Firmenwerte';
      case 'Intangibles':
        return 'Immaterielle Vermögenswerte';
      case 'Current Liabilities':
        return 'Kurzfristige Verbindlichkeiten';
      case 'Total Liabilities':
        return 'Verbindlichkeiten';
      case 'Long-term Debt':
        return 'Langfristige Finanzschulden';
      case 'Shareholder Equity':
        return 'Eigenkapital';
      case 'Operating Cashflow':
        return 'Mittelzufluss/-abfluss aus Geschäftstätigkeit';
      case 'Depreciation':
        return 'Abschreibungen';
      case 'CAPEX':
        return 'Investitionen in immaterielle Vermögenswerte und Sachanlagen';
      case 'Investing Cashflow':
        return 'Mittelzufluss/-abfluss aus Investitionstätigkeit';
      case 'Issuance of Stock':
        return 'Erwerb eigener Anteile';
      case 'Issuance of Debt':
        return 'Begebung von Anleihen';
      case 'Financing Cashflow':
        return 'Mittelzufluss/-abfluss aus Finanzierungstätigkeit';
      case 'Start Cash':
        return 'Zahlungsmittel (Vorjahr)';
      case 'End Cash':
        return 'Zahlungsmittel (aktuelles Jahr)';
      case 'Revenue':
        return 'Umsatz';
      case 'Operating Revenue':
        return 'EBITDA';
      case 'Net Income':
        return 'Jahresüberschuss';
      case 'Earnings per Share':
        return 'Gewinn pro Aktie';
      case 'Dividend':
        return 'Dividende';
      case 'Outstanding Shares (Diluted)':
        return 'Ausstehende Aktien (verwässert)';
      case 'Share Price (End of period)':
        return 'Aktienpreis Ende Geschäftsjahr';
      case 'Price-Earnings Ratio':
        return 'Kurs-Gewinn-Verhältnis';
      case 'Price-Cashflow Ratio':
        return 'Kurs-Cashflow-Verhältnis';
      case 'Price-Book Ratio':
        return 'Kurs-Buchwert-Verhältnis';
      case 'Price/Earnings to Growth':
        return 'Kurs-Gewinn-Wachstums-Verhältnis';
      case 'Enterprise Ratio':
        return 'Enterprise Ratio';
      case 'Price 52W':
        return 'Kurs (52W)';
      case 'Current Yield':
        return 'Umlaufrendite';
      case 'Current Ratio':
        return 'Liquidität 3. Grades';
      case 'Buybacks':
        return 'Rückkäufe';
      case 'Solvency':
        return 'Liquidität';
      case 'Dividend Payout':
        return 'Ausschüttungsquote';
      case 'Operating Margin':
        return 'Umsatzrendite';
      case 'Net Margin':
        return 'Nettomarge';
      case 'Return on Equity':
        return 'Eigenkapitalrendite';
      case 'Return on Assets Employed':
        return 'Gesamtkapitalrendite';
      case 'Return on Total Capital Employed':
        return 'Gesamtkapitalrendite';
      case 'Long-term Dept/Operating Income Ratio':
        return 'Verhältnis Schulden/Betriebsgewinn';
      case 'Operating Income':
        return 'Betriebsgewinn';
      case 'Historic Yield':
        return 'Dividendenrendite';
      default:
        return value;
    }
  }
}