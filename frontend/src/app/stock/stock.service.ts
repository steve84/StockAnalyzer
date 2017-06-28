import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

import { Stock } from './stock';

@Injectable()
export class StockService {

  constructor(private http: Http) { }

  getStocks(page: number, size: number, sortField?: string, sortOrder?: number) {
    let url = "http://192.168.1.105:8080/stocks";
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
  
  setStockCategory(stock: Stock) {
	  if (stock) {
		  if (stock.levermann && stock.levermann.marketCapitalization) {
			if (stock.levermann.marketCapitalization >= 200000)
			  stock.stockCategory = "Large Cap";
			else if (stock.levermann.marketCapitalization < 2000)
			  stock.stockCategory = "Small Cap";
			else
			  stock.stockCategory = "Mid Cap";
		  } else {
			  stock.stockCategory = "n.a.";
		  }
	  }
  }

  extractData(resp: Response) {
    return resp.json();
  }

}
