import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output } from '@angular/core';

import { Chart } from 'angular-highcharts';

import { StockService } from '../stock.service';
import { FundamentalService } from '../fundamental.service';
import { TechnicalDataService } from '../technicaldata.service';

import { Stock } from '../stock';
import { DailyFundamental } from '../dailyfundamental';
import { AnnualFundamental } from '../annualfundamental';
import { TechnicalData } from '../technicaldata';

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
  private dailyfundamental: DailyFundamental;
  private annualfundamental: AnnualFundamental;
  private technicaldata: TechnicalData;
  private historicalData: any[] = [];
  private chart: Chart;
  private historicalChart: Chart;
  private indexNames: string[] = [];

  constructor(private stockService: StockService,
              private fundamentalService: FundamentalService,
              private technicalDataService: TechnicalDataService) {
    this.title = "Fundamental data";
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.display && changes.display.currentValue) {
      this.getFundamentals();
      this.getTechnicalData();
      this.getHistoricalData();
      this.getIndexNames();
    }
  }

  getFundamentals() {
    if (this.stock) {
      this.fundamentalService.getDailyFundamentalByStockId(this.stock.stockId)
        .subscribe((data:DailyFundamental) => {
            this.dailyfundamental = data;
        });

      this.fundamentalService.getAnnualFundamentalByStockId(this.stock.stockId)
        .subscribe((data:AnnualFundamental[]) => {
				  if (data && data.length == 0)
					  this.annualfundamental = null;
          let newestAnnualFundamental: AnnualFundamental = null;
          for (let af of data) {
            if (!newestAnnualFundamental || newestAnnualFundamental.yearValue < af.yearValue) {
              this.annualfundamental = af;
            }
          }
        });
    }
  }

  getTechnicalData() {
    if (this.stock) {
      this.technicalDataService.getTechnicalDataByStockId(this.stock.stockId)
        .subscribe((data:TechnicalData) => {
			this.technicaldata = data;
        });
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
    this.display = false;
    this.close.emit(false);
  }

}
