import { Component, OnInit } from '@angular/core';

import { SelectItem, Message } from 'primeng/primeng';

import { StockService } from '../stock.service';
import { IndexService } from '../index.service';

import { Score } from '../score';
import { Stock } from '../stock';
import { IndexType } from '../indextype';

import { CommonTranslationPipe } from '../common_translation.pipe';

@Component({
  selector: 'app-scorecombiner',
  templateUrl: './scorecombiner.component.html',
  styleUrls: ['./scorecombiner.component.css']
})
export class ScorecombinerComponent implements OnInit {
  levermannFactor: number = 40;
  magicFormulaFactor: number = 20;
  piotroskiFactor: number = 40;
  numRowValues: SelectItem[] = [];
  numRows: number = 10;
  msgs: Message[] = [];
  scores: Score[];
  selectedScore: Score;
  stockOrIndexItem: SelectItem[] = [];
  stockOrIndex: string = 'stock';
  commonTranslationPipe: CommonTranslationPipe = new CommonTranslationPipe();
  constructor(private stockService: StockService, private indexService: IndexService) {
    this.numRowValues.push({label: '10', value: 10});
    this.numRowValues.push({label: '20', value: 20});
    this.numRowValues.push({label: '30', value: 30});

    this.stockOrIndexItem.push({label: this.commonTranslationPipe.transform('Stocks'), value: 'stock'});
    this.stockOrIndexItem.push({label: this.commonTranslationPipe.transform('Indices'), value: 'index'});
  }

  ngOnInit() {
  }
  
  getScoreValues() {
    if (this.stockOrIndex == 'stock') {
      this.stockService.getNormalizedScores(this.levermannFactor / 100, this.magicFormulaFactor / 100, this.piotroskiFactor / 100, this.numRows)
        .subscribe((data: any) => {
        this.scores = data["_embedded"]["normalizedscore"];
        for (let score of this.scores) {
          this.stockService.getStockFromNormalizedValue(score.scoreId)
            .subscribe((data:Stock) => score.stock = data);
        }
      });
    } else {
      this.indexService.getNormalizedScores(this.levermannFactor / 100, this.magicFormulaFactor / 100, this.piotroskiFactor / 100, this.numRows)
        .subscribe((data: any) => {
        this.scores = data["_embedded"]["normalizedscore"];
        for (let score of this.scores) {
          this.indexService.getIndexFromNormalizedValue(score.scoreId)
            .subscribe((data:IndexType) => score.index = data);
        }
      });
    }
  }
  
  handleChange(event: any) {
    let sumFactors = this.levermannFactor + this.magicFormulaFactor + this.piotroskiFactor;
    if (sumFactors != 100)
      this.msgs = [{severity: 'info', summary: this.commonTranslationPipe.transform('Information'), detail: this.commonTranslationPipe.transform('The sum of the factors has to be 100 (actual: ') + sumFactors + ")"}];
    else
      this.msgs = [];
  }
  
  handleSelectChange(event: any) {
    this.scores = [];
  }
  
  isValid(): boolean {
    return (this.levermannFactor + this.magicFormulaFactor + this.piotroskiFactor) == 100;
  }
}
