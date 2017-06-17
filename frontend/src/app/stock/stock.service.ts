import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

import { Symbol } from './symbol';

@Injectable()
export class StockService {

  constructor(private http: Http) { }

  getStocks(page: number, size: number, sortField?: string, sortOrder?: number) {
    let url = "http://192.168.1.115:8080/stocks";
    let params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("size", size.toString());
    if (sortField && sortOrder)
      if(sortOrder == 1)
        params.set("sort", sortField + ",asc");
      else
        params.set("sort", sortField + ",desc");
    return this.http.get(url, {search: params})
      .map(this.extractData);
  }

  extractData(resp: Response) {
    return resp.json();
  }

}
