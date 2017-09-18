import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class FundamentalService {

  constructor(private http: Http) { }

  getValuesByStockId(stockId: number) {
    let url = "http://localhost:8080/stocks/" + stockId + "/values";

    return this.http.get(url)
      .map(this.extractDataValues);
  }
  
  getNewestValueByStockId(stockId: number) {
    let url = "http://localhost:8080/values/search/findFirst1ByStockIdOrderByModifiedAtDesc";

    let params = new URLSearchParams();
    params.set("stockId", stockId.toString());

    return this.http.get(url, {search: params})
      .map(this.extractDataValues);
  }

  getSignalsByStockId(stockId: number) {
    let url = "http://localhost:8080/stocks/" + stockId + "/signals";

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
}
