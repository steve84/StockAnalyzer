import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output } from '@angular/core';

import { HelperService } from '../../helper.service';

import { IndexService } from '../index.service';

import { IndexType } from '../indextype';
import { Stock } from '../stock';

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
  chartData: any;
  loading: boolean = false;

  constructor(private indexService: IndexService,
              private helperService: HelperService) {}
  
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
        this.chartData = this.helperService.createPieChartData(this.allStocks, 'country.name', null, true, true);
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
