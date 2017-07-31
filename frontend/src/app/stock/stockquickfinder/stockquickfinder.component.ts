import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { StockService } from '../stock.service';

import { Stock } from '../stock';

@Component({
  selector: 'app-stockquickfinder',
  templateUrl: './stockquickfinder.component.html',
  styleUrls: ['./stockquickfinder.component.css']
})
export class StockquickfinderComponent implements OnInit {
	@Output("OnStockSelect") onStockSelect: EventEmitter<Stock> = new EventEmitter<Stock>();
	private stock: Stock;
	private suggestedStocks: Stock[];

  constructor(private stockService: StockService) { }

  ngOnInit() {
  }
	
	search(event) {
	  this.stockService.findByIsinOrName(event.query)
		  .subscribe((data:any) => {
			  this.suggestedStocks = data._embedded.stock;
			});
	}
	
	selectStock(stock: Stock) {
	  this.onStockSelect.emit(stock);
	}

}
