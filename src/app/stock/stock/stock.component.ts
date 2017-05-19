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
  private key: string = "";

  constructor(private stockService: StockService) {}

  getStocks() {
    this.stockService.getAllStocks(this.key).subscribe((data:Stock[]) => this.stocks = data);
  }

  ngOnInit() {
  }

}
