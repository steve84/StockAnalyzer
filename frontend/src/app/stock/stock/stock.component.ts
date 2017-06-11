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

  constructor(private stockService: StockService) {
    this.getAllStocks();
  }

  getAllStocks() {
    this.stockService.getAllStocks().subscribe((data:Stock[]) => this.stocks = data);
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
