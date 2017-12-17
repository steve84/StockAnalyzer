import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UIChart } from "primeng/components/chart/chart";

import { HelperService } from '../../helper.service';
import { UserService } from '../../user.service';

import { StockService } from '../stock.service';
import { FundamentalService } from '../fundamental.service';
import { PriceService } from '../price.service';

import { Stock } from '../stock';
import { Signals } from '../signals';
import { Values } from '../values';
import { Price } from '../price';

import { FigureTranslationPipe } from '../figure_translation.pipe';
import { MessageTranslationPipe } from '../message_translation.pipe';

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
  
  figureTranslationPipe: FigureTranslationPipe = new FigureTranslationPipe('en_US');
  messagePipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
  
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
              @Inject(LOCALE_ID) private locale: string,
              private userService: UserService,
              private helperService: HelperService,
              private route: ActivatedRoute,
              private router: Router,
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
      'currentAssets': this.figureTranslationPipe.transform('Current Assets', this.locale),
      'totalAssets': this.figureTranslationPipe.transform('Total Assets', this.locale),
      'goodwill': this.figureTranslationPipe.transform('Goodwill', this.locale),
      'intangibles': this.figureTranslationPipe.transform('Intangibles', this.locale),
      'currentLiabilities': this.figureTranslationPipe.transform('Current Liabilities', this.locale),
      'totalLiabilities': this.figureTranslationPipe.transform('Total Liabilities', this.locale),
      'longTermDebt': this.figureTranslationPipe.transform('Long-term Debt', this.locale),
      'shareholderEquity': this.figureTranslationPipe.transform('Shareholder Equity', this.locale)
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
      'cashOperations': this.figureTranslationPipe.transform('Operating Cashflow', this.locale),
      'depreciation': this.figureTranslationPipe.transform('Depreciation', this.locale),
      'capex': this.figureTranslationPipe.transform('CAPEX', this.locale),
      'cashInvesting': this.figureTranslationPipe.transform('Investing Cashflow', this.locale),
      'issuanceOfStock': this.figureTranslationPipe.transform('Issuance of Stock', this.locale),
      'issuanceOfDdebt': this.figureTranslationPipe.transform('Issuance of Debt', this.locale),
      'cashFinancing': this.figureTranslationPipe.transform('Financing Cashflow', this.locale),
      'startCash': this.figureTranslationPipe.transform('Start Cash', this.locale),
      'endCash': this.figureTranslationPipe.transform('End Cash', this.locale)
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
      'revenue': this.figureTranslationPipe.transform('Revenue', this.locale),
      'operatingRevenue': this.figureTranslationPipe.transform('Operating Revenue', this.locale),
      'netIncomeExc': this.figureTranslationPipe.transform('Net Income', this.locale),
      'epsExc': this.figureTranslationPipe.transform('Earnings per Share', this.locale),
      'dividend': this.figureTranslationPipe.transform('Dividend', this.locale),
      'dilutedSharesOs': this.figureTranslationPipe.transform('Outstanding Shares (Diluted)', this.locale),
      'historicYield': this.figureTranslationPipe.transform('Historic Yield', this.locale),
      'sharePriceEop': this.figureTranslationPipe.transform('Share Price (End of period)', this.locale)
    };
    
    this.valueFields.push('priceEarningsRatio');
    this.valueFields.push('priceCashflowRatio');
    this.valueFields.push('priceBookRatio');
    this.valueFields.push('pegRatio');
    this.valueFields.push('enterpriseRatio');
    this.valueFields.push('price52Wk');
    this.valueFields.push('currentYield');
    
    this.valueLabels = {
      'priceEarningsRatio': this.figureTranslationPipe.transform('Price-Earnings Ratio', this.locale),
      'priceCashflowRatio': this.figureTranslationPipe.transform('Price-Cashflow Ratio', this.locale),
      'priceBookRatio': this.figureTranslationPipe.transform('Price-Book Ratio', this.locale),
      'pegRatio': this.figureTranslationPipe.transform('Price/Earnings to Growth', this.locale),
      'enterpriseRatio': this.figureTranslationPipe.transform('Enterprise Ratio', this.locale),
      'price52Wk': this.figureTranslationPipe.transform('Price 52W', this.locale),
      'currentYield': this.figureTranslationPipe.transform('Current Yield', this.locale)
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
      'currentRatio': this.figureTranslationPipe.transform('Current Ratio', this.locale),
      'buybacks': this.figureTranslationPipe.transform('Buybacks', this.locale),
      'solvency': this.figureTranslationPipe.transform('Solvency', this.locale),
      'dividendPayout': this.figureTranslationPipe.transform('Dividend Payout', this.locale),
      'operatingMargin': this.figureTranslationPipe.transform('Operating Margin', this.locale),
      'netIncMargin': this.figureTranslationPipe.transform('Net Margin', this.locale),
      'roe': this.figureTranslationPipe.transform('Return on Equity', this.locale),
      'roae': this.figureTranslationPipe.transform('Return on Assets Employed', this.locale),
      'rotc': this.figureTranslationPipe.transform('Return on Total Capital Employed', this.locale),
      'ltDebtOpIncome': this.figureTranslationPipe.transform('Long-term Dept/Operating Income Ratio', this.locale)
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
      'revenue': this.figureTranslationPipe.transform('Revenue', this.locale),
      'operatingIncome': this.figureTranslationPipe.transform('Operating Income', this.locale),
      'netIncomeExc': this.figureTranslationPipe.transform('Net Income', this.locale),
      'cashOperations': this.figureTranslationPipe.transform('Operating Cashflow', this.locale),
      'depreciation': this.figureTranslationPipe.transform('Depreciation', this.locale),
      'capex': this.figureTranslationPipe.transform('CAPEX', this.locale),
      'startCash': this.figureTranslationPipe.transform('Start Cash', this.locale),
      'endCash': this.figureTranslationPipe.transform('End Cash', this.locale),
      'epsExc': this.figureTranslationPipe.transform('Earnings per Share', this.locale),
      'dividend': this.figureTranslationPipe.transform('Dividend', this.locale)
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
              }, (err:any) => this.helperService.handleError(err));
          }
        }
      });
    this.stockService.getStockEmitter()
      .subscribe((data:Stock) => {
        if (!this.userService.isLoggedIn()) {
          this.helperService.setNextUrl(this.helperService.getActualRoute());
          this.router.navigate(['/login']);
          this.helperService.addGlobalMessage({severity: 'info', summary: '', detail: this.messagePipe.transform(21, this.locale)});
        } else {
          this.stock = data;
          this.title = this.stock.name;
          this.getValue();
          this.getSignals();
          this.getPrices();
          this.getIndexNames();
          this.display = true;
        }
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
        .subscribe((data:Values[]) => this.value = data[0], (err:any) => this.helperService.handleError(err));
    }
  }

  getSignals() {
    if (this.stock) {
      this.fundamentalService.getSignalsByStockId(this.stock.stockId)
        .subscribe((data:Signals[]) => this.signals = data, (err:any) => this.helperService.handleError(err));
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
        }, (err:any) => this.helperService.handleError(err));
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
