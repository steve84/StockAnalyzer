import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Chart } from 'angular-highcharts';

import { StockService } from '../stock.service';
import { FundamentalService } from '../fundamental.service';

import { Stock } from '../stock';
import { Signals } from '../signals';
import { Values } from '../values';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-fundamental',
  templateUrl: './fundamental.component.html',
  styleUrls: ['./fundamental.component.css']
})
export class FundamentalComponent implements OnInit, OnChanges {
  @Input('display') display: boolean = false;
  @Input('stock') stock: Stock;
  @Output('close') close: EventEmitter<boolean> = new EventEmitter<boolean>();
  title: string;
  value: Values;
  signals: Signals[] = [];
  chart: Chart;
  historicalChart: Chart;
  indexNames: string[] = [];
  
  balanceFields: string[] = [];
  cashflowFields: string[] = [];
  incomeFields: string[] = [];
  valueFields: string[] = [];
  signalFields: string[] = [];
  forecastFields: string[] = [];
  
  balanceLabels: any = {};
  cashflowLabels: any = {};
  incomeLabels: any = {};
  valueLabels: any = {};
  signalLabels: any = {};
  forecastLabels: any = {};

  constructor(private stockService: StockService,
              private fundamentalService: FundamentalService,
              private route: ActivatedRoute,
              private location: Location) {
    this.title = "Fundamental data";
    
    this.balanceFields.push('currentAssets');
    this.balanceFields.push('goodwill');
    this.balanceFields.push('intangibles');
    this.balanceFields.push('totalAssets');
    this.balanceFields.push('currentLiabilities');
    this.balanceFields.push('longTermDebt');
    this.balanceFields.push('totalLiabilities');
    this.balanceFields.push('shareholderEquity');
    
    this.balanceLabels = {
      'currentAssets': 'Current Assets';
      'totalAssets': 'Total Assets';
      'goodwill': 'Goodwill';
      'intangibles': 'Intangibles';
      'currentLiabilities': 'Current Liabilities';
      'totalLiabilities': 'Total Liabilities';
      'longTermDebt': 'Long-term Debt';
      'shareholderEquity': 'Shareholder Equity';
    };
  }

  ngOnInit() {
     this.route.params
      .subscribe((params:any) => {
        if (Object.keys(params).indexOf('id') > -1) {
          let id = +params['id'];
          if (!isNaN(id)) {
            this.stockService.getStockById(id)
              .subscribe((data:Stock) => {
                this.stock = data;
                this.getValue();
                this.getSignals();
                this.getIndexNames();
                this.display = true;
              });
          }
        }
      });
    this.stockService.getStockEmitter()
      .subscribe((data:Stock) => {
        this.stock = data;
        this.getValue();
        this.getSignals();
        this.getIndexNames();
        this.display = true;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.display && changes.display.currentValue) {
      this.getValue();
      this.getSignals();
      this.getIndexNames();
    }
  }

  getValue() {
    if (this.stock) {
      this.fundamentalService.getNewestValueByStockId(this.stock.stockId)
        .subscribe((data:Values[]) => this.value = data[0]);
    }
  }

  getSignals() {
    if (this.stock) {
      this.fundamentalService.getSignalsByStockId(this.stock.stockId)
        .subscribe((data:Signals[]) => this.signals = data);
    }
  }
  

  getIndexNames() {
    this.indexNames = [];
    if (this.stock && Object.keys(this.stock.indexParticipation).length > 0) {
      this.indexNames = Object.keys(this.stock.indexParticipation);
    }
  }

  closeDisplay() {
    if (this.display) {
      this.display = false;
      this.close.emit(false);
      //this.location.back();
    }
  }

}
