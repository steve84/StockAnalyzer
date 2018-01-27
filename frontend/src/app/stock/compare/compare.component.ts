import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';

import { UIChart } from "primeng/components/chart/chart";

import { FundamentalService } from '../fundamental.service';
import { StockService } from '../stock.service';
import { HelperService } from '../../helper.service';

import { Stock } from '../stock';
import { Values } from '../values';
import { Signals } from '../signals';

import { FigureTranslationPipe } from '../figure_translation.pipe';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  stocks: Stock[] = [];
  
  stockIds: number[] = [];
  chartObj: any;
  options: any = {maintainAspectRatio: false};
  totalRecords: number = 0;
  page: number = 0;
  pageSize: number = 20;
  sortField: string;
  sortOrder: number;
  loading: boolean = false;

  figureTranslationPipe: FigureTranslationPipe = new FigureTranslationPipe('en_US');

  balanceChartObj: any;
  cashflowChartObj: any;
  incomeChartObj: any;
  valuesChartObj: any;
  signalsChartObj: any;
  forecastChartObj: any;

  balanceLabels: any = {};
  cashflowLabels: any = {};
  incomeLabels: any = {};
  valueLabels: any = {};
  signalLabels: any = {};
  forecastLabels: any = {};
  
  selectedBalanceFigure: string;
  selectedCashflowFigure: string;
  selectedIncomeFigure: string;
  selectedSignalFigure: string;
  selectedForecastFigure: string;
  
  selectedValueFigureRow: any;

  @ViewChild("chart") chart: UIChart;
  @ViewChild("balanceChart") balanceChart: UIChart;
  @ViewChild("cashflowChart") cashflowChart: UIChart;
  @ViewChild("incomeChart") incomeChart: UIChart;
  @ViewChild("valueChart") valueChart: UIChart;
  @ViewChild("signalChart") signalChart: UIChart;
  @ViewChild("forecastChart") forecastChart: UIChart;
  constructor(private stockService: StockService,
              private fundamentalService: FundamentalService,
              private helperService: HelperService,
              private location: Location,
              @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.balanceLabels = this.fundamentalService.getBalanceLabels();
    this.cashflowLabels = this.fundamentalService.getCashflowLabels();
    this.incomeLabels = this.fundamentalService.getIncomeLabels();
    this.valueLabels = this.fundamentalService.getValueLabels();
    this.signalLabels = this.fundamentalService.getSignalLabels();
    this.forecastLabels = this.fundamentalService.getForecastLabels();

    this.selectedBalanceFigure = Object.keys(this.balanceLabels)[0];
    this.selectedCashflowFigure = Object.keys(this.cashflowLabels)[0];
    this.selectedIncomeFigure = Object.keys(this.incomeLabels)[0];
    this.selectedSignalFigure = Object.keys(this.signalLabels)[0];
    this.selectedForecastFigure = Object.keys(this.forecastLabels)[0];

    this.getStocks();
  }

  onLazyLoad(event: any) {
    this.pageSize = event.rows;
    this.page = (event.first / event.rows);
    this.sortField = event.sortField;
    this.sortOrder = event.sortOrder;
    this.getStocks();
  }
  
  getStocks() {
    this.loading = true;
    this.stockIds = this.helperService.getLocalStorageItem('compare');
    this.stockService.searchStocks(null, null, null, null, null, null, null, this.stockIds, this.page, this.pageSize, this.sortField, this.sortOrder)
      .subscribe((data:any) => {
        this.stocks = data._embedded.stock;
        this.totalRecords = data.page.totalElements;
        this.getValueOfStocks();
        this.getSignalsOfStocks();
        this.createFigureCharts();
        this.loading = false;
      }, (err:any) => {
        this.loading = false;
        this.helperService.handleError(err);
      }
    );
  }
  
  getValueOfStocks() {
    for (let stock of this.stocks) {
      this.fundamentalService.getNewestValueByStockId(stock.stockId)
        .subscribe((data:Values[]) => stock['value'] = data[0], (err:any) => this.helperService.handleError(err));
    }
  }

  getSignalsOfStocks() {
    for (let stock of this.stocks) {
      this.fundamentalService.getSignalsByStockId(stock.stockId)
        .subscribe((data:Signals[]) => stock['signals'] = data, (err:any) => this.helperService.handleError(err));
    }
  }
  
  getObjects(obj: any) {
    return Object.keys(obj);
  }
  
  getValueHeader() {
    let header = [{'field': 'title', 'header': ''}];
    let i = 0;
    for (let stock of this.stocks) {
      header.push({'field': i.toString(), 'header': stock.name});
      i++;
    }
    return header;
  }
  
  getValueProperties(value: Values) {
    let properties = [];
    let excludeProperties = ['valuesId', 'stockId', 'modifiedAt', '_links', 'roburScore', 'grahamMultiplier', 'marketCapitalization'];
    if (value) {
      for (let property of Object.keys(value)) {
        if (excludeProperties.indexOf(property) == -1)
          properties.push(property);
      }
    }
    return properties.reverse();
  }
  
  handleChange(event: any) {
    setTimeout(() => this.createFigureCharts(), 100);
  }
  
  selectValueRow(event: any) {
    this.valuesChartObj = null;
    let labels = [];
    let values = [];
    for (let stock of this.stocks) {
      labels.push(stock.name);
      values.push(stock['value'][event.data]);
    }
    this.valuesChartObj = this.helperService.createLineOrBarChart(this.figureTranslationPipe.transform(this.valueLabels[event.data], this.locale), labels, values, true);
  }
  
  
  createCharts(dataset: string, figure: string, reverse: boolean = true) {
    let chart;
    for (let stock of this.stocks) {
      if (Object.keys(stock).indexOf(dataset) > -1) {
        let labels = stock[dataset].map(function(ele, i, arr){return ele.modifiedAt.substring(0,4);});
        let values = stock[dataset].map(function(ele, i, arr){return ele[figure];});
        if (reverse) {
          labels.reverse();
          values.reverse();
        }
        chart = this.helperService.createLineOrBarChart(
          stock.name,
          labels,
          values,
          true,
          chart
        );
      }
    }
    return chart;
  }
  
  createFigureCharts(selectedFigure?: string) {
    if (!selectedFigure || (selectedFigure && Object.keys(this.balanceLabels).indexOf(selectedFigure) > -1))
      this.balanceChartObj = this.createCharts('balance', this.selectedBalanceFigure);
    if (!selectedFigure || (selectedFigure && Object.keys(this.cashflowLabels).indexOf(selectedFigure) > -1))
      this.cashflowChartObj = this.createCharts('cashflow', this.selectedCashflowFigure);
    if (!selectedFigure || (selectedFigure && Object.keys(this.incomeLabels).indexOf(selectedFigure) > -1))
      this.incomeChartObj = this.createCharts('income', this.selectedIncomeFigure);
    if (!selectedFigure || (selectedFigure && Object.keys(this.signalLabels).indexOf(selectedFigure) > -1))
      this.signalsChartObj = this.createCharts('signals', this.selectedSignalFigure, false);
    if (!selectedFigure || (selectedFigure && Object.keys(this.forecastLabels).indexOf(selectedFigure) > -1))
      this.forecastChartObj = this.createCharts('forecast', this.selectedForecastFigure, false);
  }
  
  goBack()  {
    this.location.back();
  }
}
