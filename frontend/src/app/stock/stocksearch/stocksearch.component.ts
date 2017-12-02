import { Component, OnInit, EventEmitter, Output, Inject, LOCALE_ID } from '@angular/core';

import { SelectItem } from 'primeng/primeng';

import { StockService } from '../stock.service';
import { IndexService } from '../index.service';

import { Stock } from '../stock';
import { Country } from '../country';
import { Branch } from '../branch';
import { IndexType } from '../indextype';

import { CountryTranslationPipe } from '../country_translation.pipe';
import { BranchTranslationPipe } from '../branch_translation.pipe';

@Component({
  selector: 'app-stocksearch',
  templateUrl: './stocksearch.component.html',
  styleUrls: ['./stocksearch.component.css']
})
export class StocksearchComponent implements OnInit {
	@Output("OnStocksFound") onStocksFound: EventEmitter<Stock[]> = new EventEmitter<Stock[]>();
	name: string;
	isin: string;
	nsin: string;
	wkn: string;
	selectedCountries: number[];
	countries: SelectItem[];
	selectedBranches: number[];
	branches: SelectItem[];
	selectedIndices: number[];
	indices: SelectItem[];
	nbrStocksFound: number = 0;
  stocks: Stock[] = [];
  totalRecords: number = 0;
  pageSize: number = 20;
  page: number = 0;
  sortField: string;
  sortOrder: number;
  countryTranslationPipe: CountryTranslationPipe = new CountryTranslationPipe('en-US');
  branchTranslationPipe: BranchTranslationPipe = new BranchTranslationPipe('en-US');

  constructor(private stockService: StockService, private indexService: IndexService, @Inject(LOCALE_ID) private locale: string) {
	  this.stockService.getAllCountries()
		  .subscribe((data:any) => {
			  this.countries = [];
				if (data && Object.keys(data).indexOf("_embedded") > -1 && Object.keys(data._embedded).indexOf("countries") > -1)
					for (let country of data._embedded.countries) {
					  this.countries.push({label: this.countryTranslationPipe.transform(country.name, this.locale), value: country.countryId});
					}
			});

	  this.stockService.getAllBranches()
		  .subscribe((data:any) => {
			  this.branches = [];
				if (data && Object.keys(data).indexOf("_embedded") > -1 && Object.keys(data._embedded).indexOf("branches") > -1)
					for (let branch of data._embedded.branches) {
					  this.branches.push({label: this.branchTranslationPipe.transform(branch.name, this.locale), value: branch.branchId});
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
  
  onLazyLoad(event: any) {
    this.pageSize = event.rows;
    this.page = (event.first / event.rows);
    this.sortField = event.sortField;
    this.sortOrder = event.sortOrder;
    this.searchStocks();
  }
	
	searchStocks() {
	  this.stockService.searchStocks(this.name, this.isin, this.nsin, this.wkn, this.selectedCountries, this.selectedBranches, this.selectedIndices, this.page, this.pageSize, this.sortField, this.sortOrder)
		  .subscribe((data:any) => {
			  if (data && data.page) 
			    this.totalRecords = this.nbrStocksFound = data.page.totalElements;
			  this.onStocksFound.emit(data._embedded.stock);
        this.stocks = data._embedded.stock;
			});
	}
	
	reset() {
    this.name = "";
    this.isin = "";
    this.nsin = "";
    this.wkn = "";
    this.selectedCountries = [];
    this.selectedBranches = [];
    this.selectedIndices = [];
    this.nbrStocksFound = 0;
    this.stocks = [];
    this.totalRecords = 0;
    this.page = 0;
	}

}
