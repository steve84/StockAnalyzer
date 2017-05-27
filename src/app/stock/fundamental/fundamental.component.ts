import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output } from '@angular/core';

import { Chart } from 'angular-highcharts';

import { StockService } from '../stock.service';

import { Fundamental } from '../fundamental';

@Component({
  selector: 'app-fundamental',
  templateUrl: './fundamental.component.html',
  styleUrls: ['./fundamental.component.css']
})
export class FundamentalComponent implements OnInit, OnChanges {
  @Input('display') display: boolean = false;
  @Input('symbol') symbol: Symbol;
  @Output('close') close: EventEmitter<boolean> = new EventEmitter<boolean>();
  private title: string;
  private fundamental: Fundamental;
  private historicalData: any[] = [];
  private chart: Chart;
  private historicalChart: Chart;

  constructor(private stockService: StockService) {
    this.title = "Fundamental data";
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.display && changes.display.currentValue) {
      this.getFundamentals();
      this.getHistoricalData();
    }
  }

  getFundamentals() {
    if (this.symbol)
      this.stockService.getFundamental(this.symbol).subscribe((data:Fundamental) => {
        this.fundamental = data;
        this.chart = new Chart({
          chart: {
            type: 'bar'
          },
          title: {
            text: 'Linechart'
          },
          credits: {
            enabled: false
          },
          xAxis: {
            categories: ['Jahreshoch', 'Jahrestief', 'Aktueller Kurs']
          },
          series: [{
            data: [+data.YearHigh, +data.YearLow, +data.LastTradePriceOnly]
          }]
        });
      });
  }

  getHistoricalData() {
    if (this.symbol) {
      this.stockService.getHistoricalData(this.symbol).subscribe((data:any[]) => {
        let xAxis: string[] = [];
        let yAxis: number[] = [];
        for(let dataset of data) {
          xAxis.push(dataset[0]);
          yAxis.push(dataset[1]);
        }
        this.historicalChart = new Chart({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Linechart'
          },
          credits: {
            enabled: false
          },
          xAxis: {
            categories: xAxis
          },
          series: [{
            data: yAxis
          }]
        });
      });
    }
  }

  closeDisplay() {
    this.display = false;
    this.close.emit(false);
  }

}
