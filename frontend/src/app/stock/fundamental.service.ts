import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class FundamentalService {

  constructor(private http: Http) { }

  getValuesByStockId(stockId: number) {
    let url = "http://localhost:8080/values/" + stockId;

    return this.http.get(url)
      .map(this.extractData);
  }

  getSignalsByStockId(stockId: number) {
    let url = "http://localhost:8080/signals/" + stockId;

    return this.http.get(url)
      .map(this.extractData);
  }

  extractData(resp: Response) {
    let json_resp = resp.json();
    return json_resp._embedded.dailyfundamental[0];
  }
}
