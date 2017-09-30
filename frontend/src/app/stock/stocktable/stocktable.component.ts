import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
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
  totalRecords: number = 0;
  pageSize: number = 10;
  lazy: boolean = true;
  @Input('stocks') stocksInput: Stock[];
  @Input('simpleTable') simpleTable: boolean = false;
  constructor(private stockService: StockService,
              private indexService: IndexService,
              private router: Router) {}
              
  ngOnChanges(changes: SimpleChanges) {
    if (changes.stocksInput.currentValue) {
      debugger
      this.lazy = false;
      this.stocks = changes.stocksInput.currentValue;
    }
  }

  loadData(event: any) {
    this.getStocks(Math.floor(event.first / event.rows), event.sortField, event.sortOrder);
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
