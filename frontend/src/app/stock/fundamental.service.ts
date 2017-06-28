import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class FundamentalService {

  constructor(private http: Http) { }

  getDailyFundamentalByStockId(stockId: number) {
    let url = "http://192.168.1.105:8080/stocks/" + stockId + "/dailyFundamental";

    return this.http.get(url)
      .map(this.extractDailyData);
  }

  getAnnualFundamentalByStockId(stockId: number) {
    let url = "http://192.168.1.105:8080/stocks/" + stockId + "/annualFundamentals";

    return this.http.get(url)
      .map(this.extractAnnualData);
  }

  extractDailyData(resp: Response) {
    return resp.json();
  }

  extractAnnualData(resp: Response) {
    let json_resp = resp.json();
    return json_resp._embedded.annualfundamental;
  }
}
