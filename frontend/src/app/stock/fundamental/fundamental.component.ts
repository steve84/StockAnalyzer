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
  
  transposeData(origData: any[]) {
    let transposedData: any[] = [];
    for (let arr of origData) {
      for (let key of Object.keys(arr)) {
        if (key != '_links') {
          if (Object.keys(transposedData).indexOf(key) < 0)
            transposedData[key] = [];
          transposedData[key][arr['modifiedAt']] = arr[key];
        }
      }
    }
    return transposedData;
  }

  createTableObject(obj: any) {
    let res: any[] = [];
    for (let key of Object.keys(obj)) {
      let entry: any = {title: key};
      for (let subkey of Object.keys(obj[key])) {
        entry[subkey.split('-')[0]] = obj[key][subkey];
      }
      res.push(entry);
    }
    return res;
  }
  
  getColsFromData(arr: any[]) {
    let cols: any[] = [];
    cols.push({field: 'title', header: 'title'});
    for (let key of Object.keys(arr)) {
      for (let subkey of Object.keys(arr[key])) {
        cols.push({field: subkey.split('-')[0], header: subkey.split('-')[0]});
      }
      return cols;
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
