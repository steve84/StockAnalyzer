import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

import { FigureTranslationPipe } from './figure_translation.pipe';

@Injectable()
export class FundamentalService {
  balanceLabels: any = {};
  cashflowLabels: any = {};
  incomeLabels: any = {};
  valueLabels: any = {};
  signalLabels: any = {};
  forecastLabels: any = {};
  
  figureTranslationPipe: FigureTranslationPipe = new FigureTranslationPipe('en_US');
  constructor(private http: AuthHttp,
              @Inject(LOCALE_ID) private locale: string) {
    this.generateLabels();
  }

  getValuesByStockId(stockId: number) {
    let url = environment.apiUrl + "/stocks/" + stockId + "/values";

    return this.http.get(url)
      .map(this.extractDataValues);
  }
  
  getNewestValueByStockId(stockId: number) {
    let url = environment.apiUrl + "/values/search/findFirst1ByStockIdOrderByModifiedAtDesc";

    let params = new URLSearchParams();
    params.set("stockId", stockId.toString());

    return this.http.get(url, {search: params})
      .map(this.extractDataValues);
  }

  getSignalsByStockId(stockId: number) {
    let url = environment.apiUrl + "/stocks/" + stockId + "/signals";

    return this.http.get(url)
      .map(this.extractDataSignals);
  }

  extractDataValues(resp: Response) {
    let json_resp = resp.json();
    return json_resp._embedded.value;
  }

  extractDataSignals(resp: Response) {
    let json_resp = resp.json();
    return json_resp._embedded.signal;
  }
  
  getBalanceLabels() {
    return this.balanceLabels;
  }

  getCashflowLabels() {
    return this.cashflowLabels;
  }

  getIncomeLabels() {
    return this.incomeLabels;
  }

  getValueLabels() {
    return this.valueLabels;
  }

  getSignalLabels() {
    return this.signalLabels;
  }

  getForecastLabels() {
    return this.forecastLabels;
  }

  private generateLabels() {
    this.balanceLabels = {
      'currentAssets': this.figureTranslationPipe.transform('Current Assets', this.locale),
      'totalAssets': this.figureTranslationPipe.transform('Total Assets', this.locale),
      'goodwill': this.figureTranslationPipe.transform('Goodwill', this.locale),
      'intangibles': this.figureTranslationPipe.transform('Intangibles', this.locale),
      'currentLiabilities': this.figureTranslationPipe.transform('Current Liabilities', this.locale),
      'totalLiabilities': this.figureTranslationPipe.transform('Total Liabilities', this.locale),
      'longTermDebt': this.figureTranslationPipe.transform('Long-term Debt', this.locale),
      'shareholderEquity': this.figureTranslationPipe.transform('Shareholder Equity', this.locale)
    };

    this.cashflowLabels = {
      'cashOperations': this.figureTranslationPipe.transform('Operating Cashflow', this.locale),
      'depreciation': this.figureTranslationPipe.transform('Depreciation', this.locale),
      'capex': this.figureTranslationPipe.transform('CAPEX', this.locale),
      'cashInvesting': this.figureTranslationPipe.transform('Investing Cashflow', this.locale),
      'cashFree': 'Free Cashflow',
      'issuanceOfStock': this.figureTranslationPipe.transform('Issuance of Stock', this.locale),
      'issuanceOfDdebt': this.figureTranslationPipe.transform('Issuance of Debt', this.locale),
      'cashFinancing': this.figureTranslationPipe.transform('Financing Cashflow', this.locale),
      'startCash': this.figureTranslationPipe.transform('Start Cash', this.locale),
      'endCash': this.figureTranslationPipe.transform('End Cash', this.locale)
    };
    
    this.incomeLabels = {
      'revenue': this.figureTranslationPipe.transform('Revenue', this.locale),
      'operatingRevenue': this.figureTranslationPipe.transform('Operating Revenue', this.locale),
      'netIncomeExc': this.figureTranslationPipe.transform('Net Income', this.locale),
      'epsExc': this.figureTranslationPipe.transform('Earnings per Share', this.locale),
      'dividend': this.figureTranslationPipe.transform('Dividend', this.locale),
      'dilutedSharesOs': this.figureTranslationPipe.transform('Outstanding Shares (Diluted)', this.locale),
      'historicYield': this.figureTranslationPipe.transform('Dividend Yield', this.locale),
      'sharePriceEop': this.figureTranslationPipe.transform('Share Price (End of period)', this.locale)
    };
    
    this.valueLabels = {
      'priceEarningsRatio': this.figureTranslationPipe.transform('Price-Earnings Ratio', this.locale),
      'priceCashflowRatio': this.figureTranslationPipe.transform('Price-Cashflow Ratio', this.locale),
      'priceBookRatio': this.figureTranslationPipe.transform('Price-Book Ratio', this.locale),
      'pegRatio': this.figureTranslationPipe.transform('Price/Earnings to Growth', this.locale),
      'enterpriseRatio': this.figureTranslationPipe.transform('Enterprise Ratio', this.locale),
      'price52Wk': this.figureTranslationPipe.transform('Price 52W', this.locale),
      'currentYield': this.figureTranslationPipe.transform('Current Yield', this.locale)
    };
    
    this.signalLabels = {
      'currentRatio': this.figureTranslationPipe.transform('Current Ratio', this.locale),
      'buybacks': this.figureTranslationPipe.transform('Buybacks', this.locale),
      'solvency': this.figureTranslationPipe.transform('Solvency', this.locale),
      'dividendPayout': this.figureTranslationPipe.transform('Dividend Payout', this.locale),
      'operatingMargin': this.figureTranslationPipe.transform('Operating Margin', this.locale),
      'netIncMargin': this.figureTranslationPipe.transform('Net Margin', this.locale),
      'roe': this.figureTranslationPipe.transform('Return on Equity', this.locale),
      'roae': this.figureTranslationPipe.transform('Return on Assets Employed', this.locale),
      'rotc': this.figureTranslationPipe.transform('Return on Total Capital Employed', this.locale),
      'ltDebtOpIncome': this.figureTranslationPipe.transform('Long-term Dept/Operating Income Ratio', this.locale)
    };

    this.forecastLabels = {
      'revenue': this.figureTranslationPipe.transform('Revenue', this.locale),
      'operatingIncome': this.figureTranslationPipe.transform('Operating Income', this.locale),
      'netIncomeExc': this.figureTranslationPipe.transform('Net Income', this.locale),
      'cashOperations': this.figureTranslationPipe.transform('Operating Cashflow', this.locale),
      'depreciation': this.figureTranslationPipe.transform('Depreciation', this.locale),
      'capex': this.figureTranslationPipe.transform('CAPEX', this.locale),
      'startCash': this.figureTranslationPipe.transform('Start Cash', this.locale),
      'endCash': this.figureTranslationPipe.transform('End Cash', this.locale),
      'epsExc': this.figureTranslationPipe.transform('Earnings per Share', this.locale),
      'dividend': this.figureTranslationPipe.transform('Dividend', this.locale)
    };
  }
}
