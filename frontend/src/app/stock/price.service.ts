import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class PriceService {

  constructor(private http: AuthHttp) { }
  
  getAllPricesByStockId(stockId: number) {
	  let url = environment.apiUrl + "/price/search/findByStockIdOrderByCreatedAtAsc";
    
    let params = new URLSearchParams();
    params.set("stockId", stockId.toString());

    return this.http.get(url, {search: params})
      .map(this.extractData);
  }
  
  getLatestPriceByStockId(stockId: number) {
	  let url = environment.apiUrl + "/price/search/findFirst1ByStockIdOrderByCreatedAtAsc";
    
    let params = new URLSearchParams();
    params.set("stockId", stockId.toString());

    return this.http.get(url, {search: params})
      .map(this.extractData);
  }

  extractData(resp: Response) {
    let json_resp = resp.json();
    return json_resp._embedded.price;
  }

}
