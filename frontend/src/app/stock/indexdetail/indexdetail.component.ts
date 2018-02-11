import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output, Inject, LOCALE_ID } from '@angular/core';

import { HelperService } from '../../helper.service';

import { IndexService } from '../index.service';
import { StockService } from '../stock.service';

import { IndexType } from '../indextype';
import { Stock } from '../stock';

import { CountryTranslationPipe } from '../country_translation.pipe';
import { BranchTranslationPipe } from '../branch_translation.pipe';

@Component({
  selector: 'app-indexdetail',
  templateUrl: './indexdetail.component.html',
  styleUrls: ['./indexdetail.component.css']
})
export class IndexdetailComponent implements OnInit, OnChanges {
  @Input('display') display: boolean = false;
  @Input('index') index: IndexType;
  @Output('close') close: EventEmitter<boolean> = new EventEmitter<boolean>();
  title: string;
  totalMarketCap: number = 0;
  stocks: Stock[] = [];
  totalRecords: number = 0;
  page: number = 0;
  pageSize: number = 10;
  sortField: string;
  sortOrder: number;
  chartDataCountry: any;
  chartDataBranch: any;
  loading: boolean = false;
  indexPercentage: any;
  countryTranslationPipe: CountryTranslationPipe = new CountryTranslationPipe('en_US');
  branchTranslationPipe: BranchTranslationPipe = new BranchTranslationPipe('en_US');
  constructor(private indexService: IndexService,
              private stockService: StockService,
              private helperService: HelperService,
              @Inject(LOCALE_ID) private locale: string) {}
  
  ngOnInit() {
    this.indexService.getIndexEmitter()
      .subscribe((data:IndexType) => {
        this.index = data;
        this.doTranslations();
        this.createCharts()
        this.setStockIndexPercentage();
        this.getStocks();
        this.display = true;
      }, (err:any) => this.loading = false);
  }

  ngOnChanges(changes: SimpleChanges) {
  }
  
  onLazyLoad(event: any) {
    this.pageSize = event.rows;
    this.page = (event.first / event.rows);
    this.sortField = event.sortField;
    this.sortOrder = event.sortOrder;
    this.getStocks();
  }
  
  setStockIndexPercentage() {
    this.indexPercentage = {};
    for (let percentage of this.index.stocks) {
      this.indexPercentage[percentage.stockId] = percentage.percentage;
    }
  }
  
  doTranslations() {
    for (let branchStat of this.index.branchStats) {
      branchStat.branch.name = this.branchTranslationPipe.transform(branchStat.branch.name, 'de');
    }
    for (let countryStat of this.index.countryStats) {
      countryStat.country.name = this.countryTranslationPipe.transform(countryStat.country.name, 'de');
    }
  }
  
  createCharts() {
    this.chartDataCountry = this.helperService.createPieChartData(
      this.index.countryStats,
      'country.name',
      'marketcap'
    );
    
    this.chartDataBranch = this.helperService.createPieChartData(
      this.index.branchStats,
      'branch.name',
      'marketcap'
    );
  }
  
  getStocks() {
    if (this.index && this.index.indexId) {
      this.loading = true;
      this.stockService.searchStocks(null, null, null, null, null, null, [this.index.indexId], null, this.page, this.pageSize, this.sortField, this.sortOrder)
        .subscribe((data:any) => {
          if (data && data.page) 
            this.totalRecords = data.page.totalElements;
          this.stocks = data._embedded.stock;
          this.loading = false;
        }, (err:any) => {
           this.loading = false;
           this.helperService.handleError(err);
        });
    }
  }
	
  getIndexName() {
    if (this.index)
      return this.index.name;
    else
      return '';
  }

  closeDisplay() {
    this.stocks = [];
    this.indexPercentage = {};
    this.display = false;
    this.close.emit(false);
    this.loading = false;
  }

}
