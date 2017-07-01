import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TechnicalDataService {

  constructor(private http: Http) { }

  getTechnicalDataByStockId(stockId: number) {
    let url = "http://localhost:8080/stocks/" + stockId + "/technicalData";

    return this.http.get(url)
      .map(this.extractData);
  }

  extractData(resp: Response) {
    return resp.json();
  }

}
