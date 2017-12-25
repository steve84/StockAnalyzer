import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { Stock } from '../stock';
import { Piotroski } from '../piotroski';

@Component({
  selector: 'app-piotroski',
  templateUrl: './piotroski.component.html',
  styleUrls: ['./piotroski.component.css']
})
export class PiotroskiComponent implements OnInit, OnChanges {
  @Input('stock') stock: Stock;
  piotroskiData: Piotroski;
  piotroskiScore: number = 0;
  calculatedAt: string;
  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stock) {
      if (changes.stock.currentValue) {
        this.piotroskiData = changes.stock.currentValue.piotroski;
        for (let score of this.stock.scores) {
          if (score.scoreType.name == 'Piotroski F-Score') {
            this.piotroskiScore = score.scoreValue;
            this.calculatedAt = score.modifiedAt;
          }
        }
      } else {
        this.piotroskiData = null;
        this.piotroskiScore = 0;
        this.calculatedAt = null;
      }
    }
  }
  
  getReturnOnAssetsScore(value: number) {
    if (value > 0)
      return 1;
    else
      return 0;
  }

  getCashOperationScore(value: number) {
    if (value > 0)
      return 1;
    else
      return 0;
  }

  getReturnOnAssetsDeltaScore(valueActual: number, valueLast: number) {
    if (valueActual > valueLast)
      return 1;
    else
      return 0;
  }
  
  getAccrualsScore(valueIncome: number, valueCashflow: number) {
    if (valueCashflow > valueIncome)
      return 1;
    else
      return 0;
  }

  getLongTermRatioScore(valueActual: number, valueLast: number) {
    if (valueActual < valueLast)
      return 1;
    else
      return 0;
  }

  getCurrentRatioScore(valueActual: number, valueLast: number) {
    if (valueActual > valueLast)
      return 1;
    else
      return 0;
  }

  getSharesOutstandingScore(valueActual: number, valueLast: number) {
    if (valueActual <= valueLast)
      return 1;
    else
      return 0;
  }

  getAssetTurnoverScore(valueActual: number, valueLast: number) {
    if (valueActual > valueLast)
      return 1;
    else
      return 0;
  }

  isBuyAdvice(): boolean {
    if (this.piotroskiScore != null) {
      return this.piotroskiScore >= 8;
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
}
