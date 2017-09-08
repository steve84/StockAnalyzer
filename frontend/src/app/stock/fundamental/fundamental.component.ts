import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Chart } from 'angular-highcharts';

import { StockService } from '../stock.service';
import { FundamentalService } from '../fundamental.service';

import { Stock } from '../stock';

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
  private title: string;
  private historicalData: any[] = [];
  private chart: Chart;
  private historicalChart: Chart;
  private indexNames: string[] = [];

  constructor(private stockService: StockService,
              private fundamentalService: FundamentalService,
              private route: ActivatedRoute,
              private location: Location) {
    this.title = "Fundamental data";
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
                this.getFundamentals();
                this.getHistoricalData();
                this.getIndexNames();
                this.display = true;
              });
          }
        }
      });
    this.stockService.getStockEmitter()
      .subscribe((data:Stock) => {
        this.stock = data;
        this.getFundamentals();
        this.getHistoricalData();
        this.getIndexNames();
        this.display = true;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.display && changes.display.currentValue) {
      this.getFundamentals();
      this.getHistoricalData();
      this.getIndexNames();
    }
  }

  getFundamentals() {
    if (this.stock) {
    }
  }


  getIndexNames() {
    this.indexNames = [];
    if (this.stock && Object.keys(this.stock.indexParticipation).length > 0) {
      this.indexNames = Object.keys(this.stock.indexParticipation);
    }
  }

  getHistoricalData() {
  }

  closeDisplay() {
    if (this.display) {
      this.display = false;
      this.close.emit(false);
      //this.location.back();
    }
  }

}
