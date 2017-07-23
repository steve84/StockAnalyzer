import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TechnicalDataService {

  constructor(private http: Http) { }

  getTechnicalDataByStockId(stockId: number) {
	  let params = new URLSearchParams();
		params.set("stockId", stockId.toString());
    let url = "http://localhost:8080/technicaldata/search/findByStockId";

    return this.http.get(url, {search: params})
      .map(this.extractData);
  }

  extractData(resp: Response) {
    let json_resp = resp.json();
    return json_resp._embedded.technicaldata[0];
  }

}
