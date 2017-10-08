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
  levermannData: Levermann;
  levermannScore: number = 0;
  levermannAdvice: string = "nicht kaufen/verkaufen";
  constructor(private stockService: StockService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stock && changes.stock.currentValue) {
      this.levermannData = changes.stock.currentValue.levermann;
      for (let score of this.stock.scores) {
        if (score.scoreType.name == 'Levermann')
          this.levermannScore = score.scoreValue;
      }
    }
  }
  
  getRoiEquityScore(value: number) {
    if (value > 20)
      return 1;
    else if (value < 10)
      return -1;
    else
      return 0;
  }

  getRoiEbitMargeScore(value: number) {
    if (value > 12)
      return 1;
    else
      return 0;
  }

  getBalanceSheetEquityRatioScore(value: number) {
    if (value > 25)
      return 1;
    else
      return 0;
  }

  getPriceEarningsRatioScore(value: number) {
    if (value > 0 && value < 12)
      return 1;
    else if (value > 16)
      return -1;
    else
      return 0;
  }

  getPriceEarningsRatio5yAvgScore(value: number) {
    if (value > 0 && value < 12)
      return 1;
    else if (value > 16)
      return -1;
    else
      return 0;
  }
  
  getPerformanceScore(value: number) {
    if (value > 5)
      return 1;
    else if (value < -5)
      return -1
    return 0;
  }
  
  getMomentumScore(value6m: number, value1y: number) {
    if (value6m > 0 && value1y < 0)
      return 1;
    else if (value6m < 0 && value1y > 0)
      return -1;
    return 0;
  }
  getEPSGrowthScore(value: number) {
    if (value > 5)
      return 1;
    else if (value < -5)
      return -1
    return 0;
  }
}
