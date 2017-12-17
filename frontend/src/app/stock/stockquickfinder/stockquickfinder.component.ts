import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { StockService } from '../stock.service';
import { HelperService} from '../../helper.service';

import { Stock } from '../stock';

@Component({
  selector: 'app-stockquickfinder',
  templateUrl: './stockquickfinder.component.html',
  styleUrls: ['./stockquickfinder.component.css']
})
export class StockquickfinderComponent implements OnInit {
	@Output("OnStockSelect") onStockSelect: EventEmitter<Stock> = new EventEmitter<Stock>();
	stock: Stock;
	suggestedStocks: Stock[];

  constructor(private stockService: StockService,
              private helperService: HelperService,
              private router: Router) { }

  ngOnInit() {
  }
	
	search(event) {
    debugger
    if (event.query && event.query != "") {
      this.stockService.findByIsinOrName(event.query)
        .subscribe((data:any) => {
          this.suggestedStocks = data._embedded.stock;
        }, (err:any) => {
          this.suggestedStocks = [];
          this.helperService.handleError(err);
        });
    }
	}
	
	selectStock(stock: Stock) {
	  this.onStockSelect.emit(stock);
    this.stockService.getStockEmitter().emit(stock);
	}

}
