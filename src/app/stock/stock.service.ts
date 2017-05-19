import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class StockService {

  constructor(private http: Http) { }

  getAllStocks(key: string) {
    debugger
    let url = "https://www.quandl.com/api/v3/datatables/MER/F1.json?mapcode=-5370&reporttype=A&reportdate.gte=2015-12-31&qopts.columns=compnumber,longname,shortname,countrycode,status,exchange,website&api_key=" + key;

    return this.http.get(url)
      .map(this.extractData);
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
      debugger
    }
    return return_object;
  }

}
