import { Injectable, EventEmitter } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

import { Stock } from './stock';

@Injectable()
export class StockService {
  private stockEmitter: EventEmitter<Stock> = new EventEmitter<Stock>();
  constructor(private http: AuthHttp) { }

  getStocks(page: number, size: number, sortField?: string, sortOrder?: number) {
    let url = "http://localhost:8080/stocks";
    let params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("size", size.toString());
    if (sortField && sortOrder) {
      if (sortField == "scoreLevermann" || sortField == "scoreMagicFormula" || sortField == "scorePiotroski") {
        url += "/search/findByScoresIsNullOrScores_ScoreType_NameOrderByScores_ScoreValue";
        if (sortField == "scoreLevermann")
          params.set("name", "Levermann");
        else if (sortField == "scoreMagicFormula")
          params.set("name", "Magic Formula");
        else if (sortField == "scorePiotroski")
          params.set("name", "Piotroski F-Score");  
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
  
  getStockFromNormalizedValue(normalizedScoreId: number) {
    let url = "http://localhost:8080/normalizedscores/" + normalizedScoreId + "/stock";
    
    return this.http.get(url)
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
	
	getAllCountries() {
	  let url = "http://localhost:8080/stocks/search/getAllCountries";

    return this.http.get(url)
      .map(this.extractData);
	}
	
	getAllBranches() {
	  let url = "http://localhost:8080/stocks/search/getAllBranches";

    return this.http.get(url)
      .map(this.extractData);
	}
	
	searchStocks(name: string,
	             isin: string,
							 nsin: string,
							 wkn: string,
							 countryIds: number[],
							 branchIds: number[],
							 indexIds: number[],
							 page?: number,
							 size?: number,
							 sortField?: string,
							 sortOrder?: number) {
	let url = "http://localhost:8080/stocks/search/searchStocks";
  let params = new URLSearchParams();
	
	if (name)
		params.set("name", name.toUpperCase());
	if (isin)
		params.set("isin", isin.toUpperCase());
	if (nsin)
		params.set("nsin", nsin.toUpperCase());
	if (wkn)
		params.set("wkn", wkn.toUpperCase());
	if (countryIds && countryIds.length)
		params.set("countryIds", countryIds.join(','));
	if (branchIds && branchIds.length)
		params.set("branchIds", branchIds.join(','));
	if (indexIds && indexIds.length)
		params.set("indexIds", indexIds.join(','));

	return this.http.get(url, {search: params})
	  .map(this.extractData);
	}
  
  getNormalizedScores(levermannFactor: number, magicFormulaFactor: number, piotroskiFactor, excludedCountries: number[], excludedBranches: number[], rows: number = 10) {
    let url = "http://localhost:8080/normalizedscores/search/getNormalizedScoresOfStocks";
    let params = new URLSearchParams();

    params.set("levermannFactor", levermannFactor.toString());
    params.set("magicFormulaFactor", magicFormulaFactor.toString());
    params.set("piotroskiFactor", piotroskiFactor.toString());
    if (excludedCountries && excludedCountries.length > 0)
      params.set("excludeCountryIds", excludedCountries.join(','));
    if (excludedBranches && excludedBranches.length > 0)
      params.set("excludeBranchIds", excludedBranches.join(','));
    params.set("rows", rows.toString());

    return this.http.get(url, {search: params})
      .map(this.extractData);
  }

  extractData(resp: Response) {
		return resp.json();
  }
  
  getStockEmitter() {
    return this.stockEmitter;
  }

}
