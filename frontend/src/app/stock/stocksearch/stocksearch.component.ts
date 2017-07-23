import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { SelectItem } from 'primeng/primeng';

import { StockService } from '../stock.service';
import { IndexService } from '../index.service';

import { Stock } from '../stock';
import { Country } from '../country';
import { Branch } from '../branch';
import { IndexType } from '../indextype';

@Component({
  selector: 'app-stocksearch',
  templateUrl: './stocksearch.component.html',
  styleUrls: ['./stocksearch.component.css']
})
export class StocksearchComponent implements OnInit {
	@Output("OnStocksFound") onStocksFound: EventEmitter<Stock[]> = new EventEmitter<Stock[]>();
	private name: String;
	private isin: String;
	private nsin: String;
	private wkn: String;
	private selectedCountries: number[];
	private countries: SelectItem[];
	private selectedBranches: number[];
	private branches: SelectItem[];
	private selectedIndices: number[];
	private indices: SelectItem[];

  constructor(private stockService: StockService, private indexService: IndexService) {
	  this.stockService.getAllCountries()
		  .subscribe((data:any) => {
			  this.countries = [];
				if (data && Object.keys(data).indexOf("_embedded") > -1 && Object.keys(data._embedded).indexOf("countries") > -1)
					for (let country of data._embedded.countries) {
					  this.countries.push({label: country.name, value: country.countryId});
					}
			});

	  this.stockService.getAllBranches()
		  .subscribe((data:any) => {
			  this.branches = [];
				if (data && Object.keys(data).indexOf("_embedded") > -1 && Object.keys(data._embedded).indexOf("branches") > -1)
					for (let branch of data._embedded.branches) {
					  this.branches.push({label: branch.name, value: branch.branchId});
					}
			});

	  this.indexService.getAllIndices()
		  .subscribe((data:any) => {
			  this.indices = [];
				if (data && Object.keys(data).indexOf("_embedded") > -1 && Object.keys(data._embedded).indexOf("index") > -1)
					for (let index of data._embedded.index) {
					  this.indices.push({label: index.name, value: index.indexId});
					}
		  });
	}

  ngOnInit() {
  }

}
