import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';

import { IndexType } from './indextype';

import { UserService } from '../user.service';

import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class IndexService {
  private indexEmitter: EventEmitter<IndexType> = new EventEmitter<IndexType>();
  constructor(private http: AuthHttp, private userService: UserService) { }

  getIndices(page: number, size: number, sortField?: string, sortOrder?: number) {
    let url = environment.apiUrl + "/indices";
    let params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("size", size.toString());
    if (sortField && sortOrder)
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
    return this.http.get(url, {search: params})
      .map(this.extractData);
  }

  getIndexById(id: number) {
    let url = environment.apiUrl + "/indices/" + id;

    return this.http.get(url)
      .map(this.extractData);
  }

  getIndexByLink(link: string) {
    return this.http.get(link)
      .map(this.extractData);
  }

  getIndexFromNormalizedValue(normalizedScoreId: number) {
    let url = environment.apiUrl + "/normalizedscores/" + normalizedScoreId + "/index";
    
    return this.http.get(url)
      .map(this.extractData);
  }
	
	getAllIndices() {
	  let url = environment.apiUrl + "/indices";

    return this.http.get(url)
      .map(this.extractData);
	}

  getNormalizedScores(levermannFactor: number, magicFormulaFactor: number, piotroskiFactor, excludedCountries: number[], size: number = 10) {
    let url = environment.apiUrl + "/normalizedscores/search/getNormalizedScoresOfIndices";
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
    params.set("size", size.toString());

    return this.http.get(url, {search: params})
      .map(this.extractData);
  }
  
  getIndexEmitter() {
    return this.indexEmitter;
  }

  extractData(resp: Response) {
    return resp.json();
  }

}
