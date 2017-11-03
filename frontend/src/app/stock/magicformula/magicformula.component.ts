import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { Stock } from '../stock';
import { MagicFormula } from '../magicformula';

@Component({
  selector: 'app-magicformula',
  templateUrl: './magicformula.component.html',
  styleUrls: ['./magicformula.component.css']
})
export class MagicformulaComponent implements OnInit {
  @Input('stock') stock: Stock;
  magicFormulaData: MagicFormula;
  magicFormulaScore: number = 0;
  calculatedAt: string;
  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stock && changes.stock.currentValue) {
      this.magicFormulaData = changes.stock.currentValue.magicFormula;
      for (let score of this.stock.scores) {
        if (score.scoreType.name == 'Magic Formula') {
          this.magicFormulaScore = score.scoreValue;
          this.calculatedAt = score.modifiedAt;
        }
      }
    }
  }
}
