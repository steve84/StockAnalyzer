import { Component, OnInit } from '@angular/core';

import { SelectItem, Message } from 'primeng/primeng';

import { StockService } from '../stock.service';
import { IndexService } from '../index.service';

import { Score } from '../score';
import { Stock } from '../stock';
import { IndexType } from '../indextype';
import { Country } from '../country';
import { Branch } from '../branch';

import { CountryTranslationPipe } from '../country_translation.pipe';
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
  countries: SelectItem[];
  excludedCountries: number[];
  branches: SelectItem[];
  excludedBranches: number[];
  selectedScore: Score;
  stockOrIndexItem: SelectItem[] = [];
  stockOrIndex: string = 'stock';
  commonTranslationPipe: CommonTranslationPipe = new CommonTranslationPipe();
  countryTranslationPipe: CountryTranslationPipe = new CountryTranslationPipe();
  constructor(private stockService: StockService, private indexService: IndexService) {
    this.numRowValues.push({label: '10', value: 10});
    this.numRowValues.push({label: '20', value: 20});
    this.numRowValues.push({label: '30', value: 30});

    this.stockOrIndexItem.push({label: this.commonTranslationPipe.transform('Stocks'), value: 'stock'});
    this.stockOrIndexItem.push({label: this.commonTranslationPipe.transform('Indices'), value: 'index'});
    
      this.stockService.getAllCountries()
          .subscribe((data:any) => {
              this.countries = [];
                if (data && Object.keys(data).indexOf("_embedded") > -1 && Object.keys(data._embedded).indexOf("countries") > -1)
                    for (let country of data._embedded.countries) {
                      this.countries.push({label: this.countryTranslationPipe.transform(country.name), value: country.countryId});
                    }
            });

      this.stockService.getAllBranches()
          .subscribe((data:any) => {
              this.branches = [];
                if (data && Object.keys(data).indexOf("_embedded") > -1 && Object.keys(data._embedded).indexOf("branches") > -1)
                    for (let branch of data._embedded.branches) {
                      this.branches.push({label: branch.name, value: branch.branchId});
                    }
            });
  }

  ngOnInit() {
  }
  
  getScoreValues() {
    if (this.stockOrIndex == 'stock') {
      this.stockService.getNormalizedScores(this.levermannFactor / 100, this.magicFormulaFactor / 100, this.piotroskiFactor / 100, this.excludedCountries, this.excludedBranches, this.numRows)
        .subscribe((data: any) => {
        this.scores = data["_embedded"]["normalizedscore"];
        for (let score of this.scores) {
          this.stockService.getStockFromNormalizedValue(score.scoreId)
            .subscribe((data:Stock) => score.stock = data);
        }
      });
    } else {
      this.indexService.getNormalizedScores(this.levermannFactor / 100, this.magicFormulaFactor / 100, this.piotroskiFactor / 100, this.excludedCountries, this.numRows)
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
  
  reset() {
    this.levermannFactor = 40;
    this.magicFormulaFactor = 20;
    this.piotroskiFactor = 40;
    this.scores = null;
    this.excludedCountries = null;
    this.excludedBranches = null;
    this.selectedScore = null;
    this.msgs = [];
    this.numRows = 10;
  }
}
