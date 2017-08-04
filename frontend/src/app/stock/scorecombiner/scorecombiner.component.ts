import { Component, OnInit } from '@angular/core';

import { SelectItem, Message } from 'primeng/primeng';

import { StockService } from '../stock.service';
import { IndexService } from '../index.service';

import { Score } from '../score';
import { Stock } from '../stock';
import { IndexType } from '../indextype';

@Component({
  selector: 'app-scorecombiner',
  templateUrl: './scorecombiner.component.html',
  styleUrls: ['./scorecombiner.component.css']
})
export class ScorecombinerComponent implements OnInit {
  private levermannFactor: number = 40;
  private magicFormulaFactor: number = 20;
  private piotroskiFactor: number = 40;
  private numRowValues: SelectItem[] = [];
  private numRows: number = 10;
  private msgs: Message[] = [];
  private scores: Score[];
  private selectedScore: Score;
  private stockOrIndexItem: SelectItem[] = [];
  private stockOrIndex: string = 'stock';
  constructor(private stockService: StockService, private indexService: IndexService) {
    this.numRowValues.push({label: '10', value: 10});
    this.numRowValues.push({label: '20', value: 20});
    this.numRowValues.push({label: '30', value: 30});

    this.stockOrIndexItem.push({label: 'Aktien', value: 'stock'});
    this.stockOrIndexItem.push({label: 'Indizes', value: 'index'});
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
      this.msgs = [{severity: 'info', summary: 'Information', detail: "Summe der Faktoren muss 100 betragen (aktuell: " + sumFactors + ")"}];
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
