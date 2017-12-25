import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output, Inject, LOCALE_ID } from '@angular/core';

import { HelperService } from '../../helper.service';

import { IndexService } from '../index.service';

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
  allStocks: Stock[] = [];
  totalRecords: number = 0;
  pageSize: number = 10;
  chartDataCountry: any;
  chartDataBranch: any;
  loading: boolean = false;
  countryTranslationPipe: CountryTranslationPipe = new CountryTranslationPipe('en_US');
  branchTranslationPipe: BranchTranslationPipe = new BranchTranslationPipe('en_US');
  constructor(private indexService: IndexService,
              private helperService: HelperService,
              @Inject(LOCALE_ID) private locale: string) {}
  
  ngOnInit() {
    this.loading = true;
    this.indexService.getIndexEmitter()
      .subscribe((data:IndexType) => {
        this.index = data;
        this.allStocks = data.realStocks;
        this.totalRecords = this.allStocks.length;
        this.stocks = this.allStocks.slice(0, this.pageSize);
        this.title = data.name;
        this.setTotalMarketCap();
        this.chartDataCountry = this.helperService.createPieChartData(this.allStocks, 'country.name', null, true, true);
        this.chartDataBranch = this.helperService.createPieChartData(this.allStocks, 'branch.branchGroup', null, true, true);
        
        let countryLabels = [];
        for (let label of this.chartDataCountry.labels) {
          countryLabels.push(this.countryTranslationPipe.transform(label, this.locale));
        }
        this.chartDataCountry.labels = countryLabels;
        
        let branchLabels = [];
        for (let label of this.chartDataBranch.labels) {
          branchLabels.push(this.branchTranslationPipe.transform(label, this.locale));
        }
        this.chartDataBranch.labels = branchLabels;
        
        this.display = true;
        this.loading = false;
      }, (err:any) => this.loading = false);
  }

  ngOnChanges(changes: SimpleChanges) {
  }
  
  loadData(event: any) {
    this.loading = true;
    if (event.sortField && event.sortOrder) {
      this.allStocks.sort(function(a, b) {
        let valueA = a;
        let valueB = b;
        let parts = event.sortField.split('.');
        for (let i=0; i < parts.length; i++) {
          valueA = valueA[parts[i]];
          valueB = valueB[parts[i]];
        }
        if (valueA > valueB)
          return 1 * event.sortOrder;
        else
          return -1 * event.sortOrder;
      });
    }
    this.stocks = this.allStocks.slice(event.first, (event.first + event.rows));
    this.loading = false;
  }
	
  setTotalMarketCap() {
    for(let stock of this.index.realStocks) {
	  if (stock.levermann && stock.levermann.marketCapitalization)
        this.totalMarketCap += stock.levermann.marketCapitalization;
    }
  }

  getIndexName() {
    if (this.index)
      return this.index.name;
    else
      return '';
  }

  closeDisplay() {
    this.display = false;
    this.close.emit(false);
    this.loading = false;
  }

}
