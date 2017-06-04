import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

import { Symbol } from './symbol';

@Injectable()
export class StockService {

  constructor(private http: Http) { }

  getAllStocks(key: string) {
    let url = "https://www.quandl.com/api/v3/datatables/MER/F1.json?mapcode=-5370&reporttype=A&reportdate.gte=2015-12-31&qopts.columns=compnumber,longname,shortname,countrycode,status,exchange,website&api_key=" + key;

    return this.http.get(url)
      .map(this.extractData);
  }

  searchSymbols(searchTerm: string) {
    let url = 'https://finance.yahoo.com/_finance_doubledown/api/resource/searchassist;gossipConfig={"queryKey":"query","resultAccessor":"ResultSet.Result","suggestionTitleAccessor":"symbol"};searchTerm=';
    url += searchTerm;
    url += '?returnMeta=true';

    return this.http.get(url)
      .map(this.extractDataYahooSymbolSearch);
  }

  getFundamental(symbol: Symbol) {
    let query = 'select * from yahoo.finance.quotes where symbol in ("' + symbol.symbol  + '")';
    let url = 'https://query.yahooapis.com/v1/public/yql?q=';
    url += query;
    url += '&format=json&env=store://datatables.org/alltableswithkeys&callback=';

    return this.http.get(url)
      .map(this.extractDataYahooFundamental);
  }

  getHistoricalData(symbol: Symbol) {
    let key = 'c-7-dq_SdcLs_6me4Azt';
    let url = "https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?date.gte=20100101&qopts.columns=date,close&api_key=";
    url += key;
    url += "&ticker=" + symbol.symbol;

    return this.http.get(url)
      .map(this.extractDataQuandlHistorical);
  }

  extractData(resp: Response) {
    let json_resp = resp.json();
    let json_resp_data = json_resp.datatable;
    let return_object: any[] = [];
    for (let data of json_resp_data.data) {
      let object: any = {};
      let index = 0;
      for (let column of json_resp_data.columns) {
        object[column.name] = data[index];
        index++;
      }
      return_object.push(object);
    }
    return return_object;
  }

  extractDataYahooSymbolSearch(resp: Response) {
    let json_resp = resp.json();
    return json_resp.data.items;
  }

  extractDataYahooFundamental(resp: Response) {
    let json_resp = resp.json();
    if (json_resp.query && json_resp.query.count == 1)
      return json_resp.query.results.quote;
    else
      return null;
  }

  extractDataQuandlHistorical(resp: Response) {
    let json_resp = resp.json();
    return json_resp.datatable.data;
  }
}
