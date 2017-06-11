import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

import { Symbol } from './symbol';

@Injectable()
export class StockService {

  constructor(private http: Http) { }

  getAllStocks() {
    let url = "http://localhost:8080/stocks";

    return this.http.get(url)
      .map(this.extractData);
  }

  extractData(resp: Response) {
    let json_resp = resp.json();
    return json_resp._embedded.stock;
  }

}
