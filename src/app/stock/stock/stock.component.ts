import { Component, OnInit } from '@angular/core';

import { StockService} from '../stock.service';

import { Stock } from '../stock';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stocks: Stock[];

  constructor(private stockService: StockService) {
    this.stockService.getAllStocks().subscribe((data:Stock[]) => this.stocks = data);
  }

  ngOnInit() {
  }

}
