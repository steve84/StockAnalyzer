import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { HelperService } from '../../helper.service';

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
  calculatedAt: string;
  levermannAdvice: string = "nicht kaufen/verkaufen";
  constructor(private helperService: HelperService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stock) {
      if (changes.stock.currentValue) {
        this.levermannData = changes.stock.currentValue.levermann;
        for (let score of this.stock.scores) {
          if (score.scoreType.name == 'Levermann') {
            this.levermannScore = score.scoreValue;
            this.calculatedAt = score.modifiedAt;
          }
        }
      } else {
        this.levermannData = null;
        this.levermannScore = 0;
        this.calculatedAt = null;
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
  
  getAnalystsScore(marketCap, buyRatio, sellRatio) {
    if (buyRatio == null || sellRatio == null || (buyRatio == 0 && sellRatio == 0))
      return 0;
    if (marketCap >= 10000) {
      if (buyRatio > sellRatio)
        return -1;
      else
        return 1;
    } else {
      if (sellRatio > buyRatio)
        return -1;
      else
        return 1;
    }
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
  
  isBuyAdvice(): boolean {
    if (this.levermannScore != null && this.levermannData && this.levermannData.marketCapitalization) {
      return ((this.levermannData.marketCapitalization >= 10000 && this.levermannScore >= 4) || (this.levermannData.marketCapitalization < 10000 && this.levermannScore >= 7));
    }
    return false;
  }
  
  getScoreCSSClass(description: boolean = false): string {
    let cssClass = 'ui-g-';
    let buyAdvice = this.isBuyAdvice();
    if (description) {
      cssClass += '10 score_description ';
      if (buyAdvice) {
        cssClass += 'buy';
      } else {
        cssClass += 'sell';
      }
    } else {
      cssClass += '2 score_value '
      if (buyAdvice) {
        cssClass += 'buy';
      } else {
        cssClass += 'sell';
      }
    }
  return cssClass;
  }
  
  showHelp() {
    this.helperService.setSideBar(true, 0);
  }
}
