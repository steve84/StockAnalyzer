import { Component, OnInit } from '@angular/core';

import { StockService} from '../stock.service';

import { Stock } from '../stock';

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

  constructor(private stockService: StockService) {}

  loadData(event: any) {
    this.getStocks(Math.floor(event.first / event.rows), event.sortField, event.sortOrder);
  }

  getStocks(page: number, sortField?: string, sortOrder?: number) {
    this.stockService.getStocks(page, this.pageSize, sortField, sortOrder).subscribe((data:any[]) => {
      this.stocks = data['_embedded']['stock'];
	  for (let stock of this.stocks) {
		  this.stockService.setStockCategory(stock);
	  }
      this.totalRecords = data['page']['totalElements'];
    });
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
