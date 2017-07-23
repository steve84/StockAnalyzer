import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

import { Stock } from './stock';

@Injectable()
export class StockService {

  constructor(private http: Http) { }

  getStocks(page: number, size: number, sortField?: string, sortOrder?: number) {
    let url = "http://localhost:8080/stocks";
    let params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("size", size.toString());
    if (sortField && sortOrder) {
      if (sortField == "scoreLevermann" || sortField == "scoreMagicFormula") {
        url += "/search/findByScoresIsNullOrScores_ScoreType_NameOrderByScores_ScoreValue";
        if (sortField == "scoreLevermann")
          params.set("name", "Levermann");
        else if (sortField == "scoreMagicFormula")
          params.set("name", "Magic Formula");  
        if(sortOrder == 1)
          url += "Asc";
        else
          url += "Desc";
      } else {
        if(sortOrder == 1)
          params.set("sort", sortField + ",asc");
        else
          params.set("sort", sortField + ",desc");
      }
    }
    return this.http.get(url, {search: params})
      .map(this.extractData);
  }

  getStockById(id: number) {
    let url = "http://localhost:8080/stocks/" + id;
    return this.http.get(url)
      .map(this.extractData);
  }

  getStockByLink(link: string) {
    return this.http.get(link)
      .map(this.extractData);
  }
	
	findByIsinOrName(query: string, size: number = 10) {
    let params = new URLSearchParams();
    params.set("isin", query);
    params.set("name", query);
		params.set("size", size.toString());
		params.set("page", "0");
		
		let url = "http://localhost:8080/stocks/search/findByIsinContainingIgnoreCaseOrNameContainingIgnoreCase";
		return this.http.get(url, {search: params})
      .map(this.extractData);
	}

  extractData(resp: Response) {
    return resp.json();
  }

}
