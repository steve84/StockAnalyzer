import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class FundamentalService {

  constructor(private http: Http) { }

  getDailyFundamentalByStockId(stockId: number) {
	  let params = new URLSearchParams();
		params.set("stockId", stockId.toString());
    let url = "http://localhost:8080/dailyfundamentals/search/findByStockId";

    return this.http.get(url, {search: params})
      .map(this.extractDailyData);
  }

  getAnnualFundamentalByStockId(stockId: number) {
		let params = new URLSearchParams();
		params.set("stockId", stockId.toString());
    let url = "http://localhost:8080/annualfundamentals/search/findByStockId";

    return this.http.get(url, {search: params})
      .map(this.extractAnnualData);
  }

  extractDailyData(resp: Response) {
    let json_resp = resp.json();
    return json_resp._embedded.dailyfundamental[0];
  }

  extractAnnualData(resp: Response) {
    let json_resp = resp.json();
    return json_resp._embedded.annualfundamental;
  }
}
