import { Component, OnInit } from '@angular/core';

import { StockService} from '../stock.service';

import { Stock } from '../stock';
import { Symbol } from '../symbol';
import { Fundamental } from '../fundamental';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stocks: Stock[] = [];
  symbols: Symbol[] = [];
  private fundamental: Fundamental = null;
  private key: string = "";
  private symbol: string = "";
  private selectedSymbol: Symbol = null;
  private display: boolean = false;

  constructor(private stockService: StockService) {}

  getStocks() {
    this.stockService.getAllStocks(this.key).subscribe((data:Stock[]) => this.stocks = data);
  }

  searchSymbol() {
    this.stockService.searchSymbols(this.symbol).subscribe((data:Symbol[]) => this.symbols = data);
  }

  getFundamentals() {
    this.stockService.getFundamental(this.selectedSymbol).subscribe((data:Fundamental) => this.fundamental = data);
  }

  showFundamental(symbol: Symbol) {
    this.selectedSymbol = symbol;
    this.display = true;
  }

  closeFundamental(display: boolean) {
    this.display = display;
  }

  ngOnInit() {
  }

}
