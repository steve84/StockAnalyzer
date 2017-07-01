import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { StockService } from '../stock.service';

import { Stock } from '../stock';
import { Levermann } from '../levermann';

@Component({
  selector: 'app-levermann',
  templateUrl: './levermann.component.html',
  styleUrls: ['./levermann.component.css']
})
export class LevermannComponent implements OnInit, OnChanges {
  @Input('stock') stock: Stock;
  private levermannData: Levermann;
  private levermannAdvice: string = "nicht kaufen/verkaufen";
  constructor(private stockService: StockService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stock && changes.stock.currentValue) {
      this.levermannData = changes.stock.currentValue.levermann;
	    this.calculateLevermannScore();
    }
  }

  calculateLevermannScore() {
    if (this.levermannData) {
      if ((this.levermannData.marketCapitalization && this.levermannData.marketCapitalization >= 10000 && this.stock.levermannScore >= 4)
      || (this.levermannData.marketCapitalization && this.levermannData.marketCapitalization < 10000 && this.stock.levermannScore >= 7)
      || (!this.levermannData.marketCapitalization && this.stock.levermannScore >= 7))
        this.levermannAdvice = "kaufen/halten";
      else
        this.levermannAdvice = "nicht kaufen/verkaufen";
    }
  }
}
