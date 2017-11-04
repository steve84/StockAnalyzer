import { Injectable, EventEmitter } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/map';

import { Stock } from './stock';

import { UserService } from '../user.service';

@Injectable()
export class StockService {
  private stockEmitter: EventEmitter<Stock> = new EventEmitter<Stock>();
  constructor(private http: AuthHttp, private userService: UserService) { }

  getStocks(page: number, size: number, sortField?: string, sortOrder?: number) {
    let url = "http://localhost:8080/stocks";
    let params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("size", size.toString());
    if (sortField && sortOrder) {
      if (sortField == "scoreLevermann" || sortField == "scoreMagicFormula" || sortField == "scorePiotroski") {
        if (this.userService.getRoles().toLowerCase().indexOf('gpu') > -1)
          url += "/search/findByScoreTypeGPU";
        else
          url += "/search/findByScoreType";

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
    
    let url = "http://localhost:8080/stocks/search/findByIsinOrName";
    if (this.userService.getRoles().toLowerCase().indexOf('gpu') > -1)
      url += "GPU";
		
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
  
  if (this.userService.getRoles().toLowerCase().indexOf('gpu') > -1)
    url += "GPU";
  
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
	if (page)
		params.set("page", page.toString());
	if (size)
		params.set("size", size.toString());
  if (sortField && sortOrder) {
    if (sortField == "scoreLevermann" || sortField == "scoreMagicFormula" || sortField == "scorePiotroski") {
      url += "ScoreType";
      if (sortField == "scoreLevermann")
        params.set("scoretype", "Levermann");
      else if (sortField == "scoreMagicFormula")
        params.set("scoretype", "Magic Formula");
      else if (sortField == "scorePiotroski")
        params.set("scoretype", "Piotroski F-Score");

      if(sortOrder == 1)
        url += "Asc";
      else
        url += "Desc";
    } else {
      if (sortOrder == 1)
        params.set("sort", sortField + ",asc");
      else
        params.set("sort", sortField + ",desc");
    }
  }

	return this.http.get(url, {search: params})
	  .map(this.extractData);
	}
  
  getNormalizedScores(levermannFactor: number, magicFormulaFactor: number, piotroskiFactor, excludedCountries: number[], excludedBranches: number[], fromMarketCap: number, toMarketCap: number, size: number = 10) {
    let url = "http://localhost:8080/normalizedscores/search/getNormalizedScoresOfStocks";
    if (this.userService.getRoles().toLowerCase().indexOf('gpu') > -1)
      url += "GPU";
    
    let params = new URLSearchParams();
    params.set("levermannFactor", levermannFactor.toString());
    params.set("magicFormulaFactor", magicFormulaFactor.toString());
    params.set("piotroskiFactor", piotroskiFactor.toString());
    if (excludedCountries && excludedCountries.length > 0)
      params.set("excludeCountryIds", excludedCountries.join(','));
    else
      params.set("excludeCountryIds", '-1');
    if (excludedBranches && excludedBranches.length > 0)
      params.set("excludeBranchIds", excludedBranches.join(','));
    else
      params.set("excludeBranchIds", '-1');
    if (fromMarketCap)
      params.set("fromMarketCap", fromMarketCap.toString());
    if (toMarketCap)
      params.set("toMarketCap", toMarketCap.toString());
    params.set("size", size.toString());

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
