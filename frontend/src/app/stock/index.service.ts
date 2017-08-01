import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class IndexService {

  constructor(private http: Http) { }

  getIndices(page: number, size: number, sortField?: string, sortOrder?: number) {
    let url = "http://localhost:8080/indices";
    let params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("size", size.toString());
    if (sortField && sortOrder)
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
    return this.http.get(url, {search: params})
      .map(this.extractData);
  }

  getIndexById(id: number) {
    let url = "http://localhost:8080/indices/" + id;

    return this.http.get(url)
      .map(this.extractData);
  }

  getIndexByLink(link: string) {
    return this.http.get(link)
      .map(this.extractData);
  }
	
	getAllIndices() {
	  let url = "http://localhost:8080/indices/search/getAllIndices";

    return this.http.get(url)
      .map(this.extractData);
	}

  extractData(resp: Response) {
    return resp.json();
  }

}
