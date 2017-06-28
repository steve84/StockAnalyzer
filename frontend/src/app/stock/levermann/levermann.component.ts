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
  private levermannScore: number = 0;
  private levermannAdvice: string = "nicht kaufen/verkaufen";
  private stockCategory: string = "n.a.";
  constructor(private stockService: StockService) { }

  ngOnInit() {
    if (this.levermannData)
      this.calculateLevermannScore();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stock && changes.stock.currentValue) {
      this.levermannData = changes.stock.currentValue.levermann;
	  this.calculateLevermannScore()
    }
  }

  calculateLevermannScore() {
    if (this.levermannData) {
      this.levermannScore = 0;

      if (this.levermannData.roiEquity) {
        if (this.levermannData.roiEquity > 20)
          this.levermannScore++;
        else if (this.levermannData.roiEquity < 10)
          this.levermannScore--;
      }

      if (this.levermannData.roiEbitMarge) {
        if (this.levermannData.roiEbitMarge > 12)
          this.levermannScore++;
      }

      if (this.levermannData.balanceSheetEquityRatio) {
        if (this.levermannData.balanceSheetEquityRatio > 25)
          this.levermannScore++;
      }

      if (this.levermannData.priceEarningsRatio5YearAverage) {
        if (this.levermannData.priceEarningsRatio5YearAverage < 12)
          this.levermannScore++;
        else if (this.levermannData.priceEarningsRatio5YearAverage > 16)
          this.levermannScore--;
      }

      if (this.levermannData.priceEarningsRatio) {
        if (this.levermannData.priceEarningsRatio < 12)
          this.levermannScore++;
        else if (this.levermannData.priceEarningsRatio > 16)
          this.levermannScore--;
      }

      if (this.levermannData.analystSellRatio) {

      }

      if (this.levermannData.performance6m) {
        if (this.levermannData.performance6m > 5)
          this.levermannScore++;
        else if (this.levermannData.performance6m < -5)
          this.levermannScore--;
      }

      if (this.levermannData.performance1y) {
        if (this.levermannData.performance1y > 5)
          this.levermannScore++;
        else if (this.levermannData.performance1y < -5)
          this.levermannScore--;
      }

      if (this.levermannData.performance6m && this.levermannData.performance1y) {
        if (this.levermannData.performance1y < 0 && this.levermannData.performance6m > 0)
          this.levermannScore++;
        else if (this.levermannData.performance1y > 0 && this.levermannData.performance6m < 0)
          this.levermannScore--;
      }

      if (this.levermannData.earningsPerShareGrowthExpected) {
        if (this.levermannData.earningsPerShareGrowthExpected * 100 > 5)
          this.levermannScore++;
        else if (this.levermannData.earningsPerShareGrowthExpected * 100 < -5)
          this.levermannScore--;
      }

      if (this.levermannData.marketCapitalization) {
        if (this.levermannData.marketCapitalization >= 200000)
          this.stockCategory = "Large Cap";
        else if (this.levermannData.marketCapitalization < 2000)
          this.stockCategory = "Small Cap";
        else
          this.stockCategory = "Mid Cap";
      }

      if ((this.stockCategory == "Large Cap" && this.levermannScore >= 4) || (this.stockCategory != "Large Cap" && this.levermannScore >= 7))
        this.levermannAdvice = "kaufen/halten";
      else
        this.levermannAdvice = "nicht kaufen/verkaufen";
    }
  }
}
