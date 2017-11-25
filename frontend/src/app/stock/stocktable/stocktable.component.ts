import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { StockService} from '../stock.service';
import { IndexService} from '../index.service';

import { Stock } from '../stock';
import { IndexType } from '../indextype';
import { StockIndexImpl } from '../stockindex';

@Component({
  selector: 'app-stocktable',
  templateUrl: './stocktable.component.html',
  styleUrls: ['./stocktable.component.css']
})
export class StockTableComponent implements OnInit, OnChanges {
  stocks: Stock[] = [];
  selectedStock: Stock = null;
  display: boolean = false;
  lazy: boolean = true;
  @Input('totalRecords') totalRecords: number = 0;
  @Input('pageSize') pageSize: number = 20;
  @Input('stocks') stocksInput: Stock[];
  @Input('external') external: boolean = false;
  @Output() onLazyLoad: EventEmitter<any> = new EventEmitter<any>();
  constructor(private stockService: StockService,
              private indexService: IndexService,
              private router: Router) {}
              
  ngOnChanges(changes: SimpleChanges) {
    if (changes.stocksInput.currentValue) {
      this.stocks = changes.stocksInput.currentValue;
    }
  }

  loadData(event: any) {
    if (this.external) {
      this.onLazyLoad.emit(event);
    } else {
      this.pageSize = event.rows;
      this.getStocks(Math.floor(event.first / event.rows), event.sortField, event.sortOrder);
    }
  }

  getStocks(page: number, sortField?: string, sortOrder?: number) {
    this.stockService.getStocks(page, this.pageSize, sortField, sortOrder).subscribe((data:any[]) => {
      this.stocks = data['_embedded']['stock'];
      this.totalRecords = data['page']['totalElements'];
      this.addIndices();
    });
  }

  private addIndices() {
    for (let stock of this.stocks) {
      stock.stockIndex = [];
      stock.indexNames = Object.keys(stock.indexParticipation).join(', ');
      for (let index of stock.indices) {
        if (index['_links'] && index['_links']['index']) {
          this.indexService.getIndexByLink(index['_links']['index']['href'])
            .subscribe((data:IndexType) => {
              let stockIndex: StockIndexImpl = new StockIndexImpl();
              stockIndex.percentage = index.percentage;
              stockIndex.indexId = data.indexId;
              stockIndex.stockId = stock.stockId;
              stock.stockIndex.push(stockIndex);
            })
        }
      }
    }
  }
  
  getCssLevermann(stock: Stock, value: number) {
    if (stock.marketCapitalization.marketCapitalization >= 10) {
      if (value >= 4)
        return {'background': 'green', 'color': 'white', 'padding': '3px'};
    } else {
      if (value >= 7)
        return {'background': 'green', 'color': 'white', 'padding': '3px'};
    }
  }

  getCssPiotroski(value: number) {
    if (value >= 8)
      return {'background': 'green', 'color': 'white', 'padding': '3px'};
    else
      return {};
  }

  showFundamental(stock: Stock) {
    this.selectedStock = stock;
    //this.router.navigate(['/stocks', this.selectedStock.stockId]);
    this.stockService.getStockEmitter().emit(this.selectedStock);
  }

  closeFundamental(display: boolean) {
    this.display = display;
  }

  ngOnInit() {
  }

}
