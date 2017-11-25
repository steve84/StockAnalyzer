import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { UIChart } from "primeng/components/chart/chart";

import { HelperService } from '../../helper.service';

import { StockService } from '../stock.service';
import { FundamentalService } from '../fundamental.service';
import { PriceService } from '../price.service';

import { Stock } from '../stock';
import { Signals } from '../signals';
import { Values } from '../values';
import { Price } from '../price';

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
  @ViewChild("chart") chart: UIChart;
  title: string;
  value: Values;
  signals: Signals[] = [];
  prices: Price[] = [];
  incomeChart: any;
  incomeChartOptions: any;
  priceChart: any;
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
              private priceService: PriceService,
              private helperService: HelperService,
              private route: ActivatedRoute,
              private location: Location) {
    this.title = "Fundamental data";
    
    this.incomeChartOptions = {
      'maintainAspectRatio': 'false'
    }
    
    this.balanceFields.push('currentAssets');
    this.balanceFields.push('goodwill');
    this.balanceFields.push('intangibles');
    this.balanceFields.push('totalAssets');
    this.balanceFields.push('currentLiabilities');
    this.balanceFields.push('longTermDebt');
    this.balanceFields.push('totalLiabilities');
    this.balanceFields.push('shareholderEquity');
    
    this.balanceLabels = {
      'currentAssets': 'Current Assets',
      'totalAssets': 'Total Assets',
      'goodwill': 'Goodwill',
      'intangibles': 'Intangibles',
      'currentLiabilities': 'Current Liabilities',
      'totalLiabilities': 'Total Liabilities',
      'longTermDebt': 'Long-term Debt',
      'shareholderEquity': 'Shareholder Equity'
    };

    this.cashflowFields.push('cashOperations');
    this.cashflowFields.push('depreciation');
    this.cashflowFields.push('capex');
    this.cashflowFields.push('cashInvesting');
    this.cashflowFields.push('issuanceOfStock');
    this.cashflowFields.push('issuanceOfDdebt');
    this.cashflowFields.push('cashFinancing');
    this.cashflowFields.push('startCash');
    this.cashflowFields.push('endCash');
    
    this.cashflowLabels = {
      'cashOperations': 'Operating Cashflow',
      'depreciation': 'Depreciation',
      'capex': 'CAPEX',
      'cashInvesting': 'Investing Cashflow',
      'issuanceOfStock': 'Issuance of Stock',
      'issuanceOfDdebt': 'Issuance of Debt',
      'cashFinancing': 'Financing Cashflow',
      'startCash': 'Start Cash',
      'endCash': 'End Cash'
    };
    
    this.incomeFields.push('revenue');
    this.incomeFields.push('operatingRevenue');
    this.incomeFields.push('netIncomeExc');
    this.incomeFields.push('epsExc');
    this.incomeFields.push('dividend');
    this.incomeFields.push('dilutedSharesOs');
    this.incomeFields.push('historicYield');
    this.incomeFields.push('sharePriceEop');
    
    this.incomeLabels = {
      'revenue': 'Revenue',
      'operatingRevenue': 'Operating Revenue',
      'netIncomeExc': 'Net Income',
      'epsExc': 'EPS',
      'dividend': 'Dividend',
      'dilutedSharesOs': 'Diluted Shares OS',
      'historicYield': 'Historic Yield',
      'sharePriceEop': 'Share Price EoP'
    };
    
    this.valueFields.push('priceEarningsRatio');
    this.valueFields.push('priceCashflowRatio');
    this.valueFields.push('priceBookRatio');
    this.valueFields.push('pegRatio');
    this.valueFields.push('enterpriseRatio');
    this.valueFields.push('price52Wk');
    this.valueFields.push('currentYield');
    
    this.valueLabels = {
      'priceEarningsRatio': 'PER',
      'priceCashflowRatio': 'PCR',
      'priceBookRatio': 'PBR',
      'pegRatio': 'PEG',
      'enterpriseRatio': 'Enterprise Ratio',
      'price52Wk': 'Price 52W',
      'currentYield': 'Current Yield'
    };
    
    this.signalFields.push('currentRatio');
    this.signalFields.push('buybacks');
    this.signalFields.push('solvency');
    this.signalFields.push('dividendPayout');
    this.signalFields.push('operatingMargin');
    this.signalFields.push('netIncMargin');
    this.signalFields.push('roe');
    this.signalFields.push('roae');
    this.signalFields.push('rotc');
    this.signalFields.push('ltDebtOpIncome');
    
    this.signalLabels = {
      'currentRatio': 'Current Ratio',
      'buybacks': 'Buybacks',
      'solvency': 'Solvency',
      'dividendPayout': 'Dividend Payout',
      'operatingMargin': 'Operating Margin',
      'netIncMargin': 'Net Margin',
      'roe': 'ROE',
      'roae': 'ROAE',
      'rotc': 'ROTC',
      'ltDebtOpIncome': 'Long-term Dept to Operating Income'
    };

    this.forecastFields.push('revenue');
    this.forecastFields.push('operatingIncome');
    this.forecastFields.push('netIncomeExc');
    this.forecastFields.push('cashOperations');
    this.forecastFields.push('depreciation');
    this.forecastFields.push('capex');
    this.forecastFields.push('startCash');
    this.forecastFields.push('endCash');
    this.forecastFields.push('epsExc');
    this.forecastFields.push('dividend');
    
    this.forecastLabels = {
      'revenue': 'Revenue',
      'operatingIncome': 'Operating Income',
      'netIncomeExc': 'Net Income',
      'cashOperations': 'Operating Cashflow',
      'depreciation': 'Depreciation',
      'capex': 'CAPEX',
      'startCash': 'Start Cash',
      'endCash': 'End Cash',
      'epsExc': 'EPS',
      'dividend': 'Dividend'
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
                this.title = this.stock.name;
                this.getValue();
                this.getSignals();
                this.getPrices();
                this.getIndexNames();
                this.display = true;
              });
          }
        }
      });
    this.stockService.getStockEmitter()
      .subscribe((data:Stock) => {
        this.stock = data;
        this.title = this.stock.name;
        this.getValue();
        this.getSignals();
        this.getPrices();
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
  
  onRowSelect(data: any) {
    let xAxisLabels: string[] = [];
    let yData: number[] = [];
    for (let key of Object.keys(data)) {
      if (key != 'title' && key != '_$visited')
        xAxisLabels.push(key);
    }
    for (let label of xAxisLabels) {
      yData.push(data[label]);
    }
    this.incomeChart = this.helperService.createLineChartData(this.incomeLabels[data['title']], xAxisLabels, yData);
    this.chart.reinit();
  }
  
  onRowUnselect(data: any) {
    //this.incomeChart = this.helperService.removeLineChartData(this.incomeLabels[data['title']], this.incomeChart);
    //this.chart.reinit();
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
  
  getPrices() {
    if (this.stock) {
      this.priceService.getAllPricesByStockId(this.stock.stockId)
        .subscribe((data:Price[]) => {
        this.prices = data;
        let chart_data = this.prices.map(p => p.price).filter(function(p,i) {
          return i % 5 == 0;
        });
        let chart_labels = this.prices.map(p => p.createdAt.split('T')[0]).filter(function(p,i) {
          return i % 5 == 0;
        });
        this.priceChart = this.helperService.createLineChartData(this.stock.name, chart_labels, chart_data);
        });
    }
  }
  

  getIndexNames() {
    this.indexNames = [];
    if (this.stock && Object.keys(this.stock.indexParticipation).length > 0) {
      this.indexNames = Object.keys(this.stock.indexParticipation);
    }
  }
  
  getStockExchange(price: Price) {
    if (price && price.quandlCode && price.quandlCode.length > 0) {
      let quandlBase = price.quandlCode.split('/')[0];
      switch (quandlBase) {
        case 'SSE':
          return 'Börse Stuttgart';
        case 'SIX':
          return 'Swiss Stock Exchange (SIX)';
        default:
          return 'n.a.';
      }
    }
    return 'n.a.';
  }

  closeDisplay() {
    if (this.display) {
      this.display = false;
      this.incomeChart = null;
      this.close.emit(false);
      //this.location.back();
    }
  }

}
