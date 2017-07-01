import { Component, OnInit } from '@angular/core';

import { StockService} from '../stock.service';
import { IndexService} from '../index.service';

import { Stock } from '../stock';
import { IndexType } from '../indextype';
import { StockIndexImpl } from '../stockindex';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stocks: Stock[] = [];
  private selectedStock: Stock = null;
  private display: boolean = false;
  private totalRecords: number = 0;
  private pageSize: number = 10;

  constructor(private stockService: StockService, private indexService: IndexService) {}

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
    this.display = true;
  }

  closeFundamental(display: boolean) {
    this.display = display;
  }

  ngOnInit() {
  }

}
