import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { Stock } from '../stock';
import { Piotroski } from '../piotroski';

@Component({
  selector: 'app-piotroski',
  templateUrl: './piotroski.component.html',
  styleUrls: ['./piotroski.component.css']
})
export class PiotroskiComponent implements OnInit {
  @Input('stock') stock: Stock;
  piotroskiData: Piotroski;
  piotroskiScore: number = 0;
  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stock && changes.stock.currentValue) {
      this.piotroskiData = changes.stock.currentValue.piotroski;
      for (let score of this.stock.scores) {
        if (score.scoreType.name == 'Piotroski')
          this.piotroskiScore = score.scoreValue;
      }
    }
  }
  
  getNetIncomeScore(value: number) {
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

  getReturnOnAssetsScore(valueActual: number, valueLast: number) {
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
}
