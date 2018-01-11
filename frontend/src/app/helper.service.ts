import { Injectable, Inject, LOCALE_ID, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import {MessageService} from './message.service';

import {Message} from 'primeng/primeng';

import { MessageTranslationPipe } from './stock/message_translation.pipe';
import { CommonTranslationPipe } from './stock/common_translation.pipe';

@Injectable()
export class HelperService {
  previousUrl: string;
  nextUrl: string;
  messagePipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
  commonPipe: CommonTranslationPipe = new CommonTranslationPipe('en-US');
  spinnerEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private router: Router,
              private messageService: MessageService,
              @Inject(LOCALE_ID) private locale: string) { }
  
  setPreviousUrl(url: string) {
    this.previousUrl = url;
  }
  
  getPreviousUrl(): string {
    return this.previousUrl;
  }
  
  setNextUrl(url: string) {
    this.nextUrl = url;
  }
  
  getNextUrl() {
    return this.nextUrl;
  }
  
  addGlobalMessage(msg: Message) {
    this.messageService.getMessageEmitter().emit(msg);
  }
  
  handleError(err: any) {
    if (err && err.message) {
      if (err.message == 'No JWT present or has expired') {
        this.setNextUrl(this.getActualRoute());
        this.router.navigate(['/login']);
        this.addGlobalMessage({severity: 'info', summary: '', detail: this.messagePipe.transform(21, this.locale)});
      }
    }
  }
  
  getActualRoute() {
    return this.router.url;
  }
  
  getSpinnerEmitter() {
    return this.spinnerEmitter;
  }
  
  setSpinner(value: boolean) {
    this.spinnerEmitter.emit(value);
  }
  
  getEmptyMessage(locale: string): string {
    return this.commonPipe.transform('No records found', locale);
  }
  
  removeLocalStorageItem(key: string) {
    if (this.isKeyInLocalStorage(key))
      localStorage.removeItem(key);
  }
  
  getLocalStorageItem(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }
  
  setLocalStorageItem(key: string, object: any) {
    localStorage.setItem(key, JSON.stringify(object));
  }
  
  isKeyInLocalStorage(key: string): boolean {
    return Object.keys(localStorage).indexOf(key) > -1;
  }

  createPieChartData(data: any[], groupBy: string, value: string, percentage: boolean = true, count?: boolean) {
    let labels: string[] = [];
    let dataArr: any[] = [];
    let backgroundColor: string[] = [];
    for (let row of data) {
      let groupByVal = this.getValueByString(row, groupBy);
      let rowValue = this.getValueByString(row, value);
      if (groupByVal && (rowValue || count)) {
      let index = labels.indexOf(groupByVal);
        if (index > -1) {
          if (count)
            dataArr[index] += 1;
          else
            dataArr[index] += rowValue
        } else {
          labels.push(groupByVal);
          backgroundColor.push(this.randomColor());
          if (count)
            dataArr.push(1);
          else
            dataArr.push(rowValue);
        }
      }
    }
    if (dataArr.length >= 1) {
      let chartData = {};
      chartData['labels'] = labels;
      chartData['datasets'] = [];
      let dataSets = {};
      if (percentage)
        dataSets['data'] = this.transformToPercentage(dataArr);
      else
        dataSets['data'] = dataArr;
      dataSets['backgroundColor'] = backgroundColor;
      chartData['datasets'].push(dataSets);
      return chartData;
    } else
      return null;
  }
  
  createLineOrBarChart(datasetName: string, xAxis: string[], yAxis: number[], bar: boolean = false, existingChart?: any) {
    if (!xAxis || xAxis.length == 0) {
      return !existingChart ? null : existingChart;
    }
  
    let lineData = {};
    // Set inital labels
    if (!existingChart) {
      lineData['labels'] = xAxis;
      lineData['datasets'] = [];
    }
    // Build dataset
    let dataset = {};
    dataset['label'] = datasetName;
    
    // Remove data of none existing labels
    if (existingChart) {
      dataset['data'] = [];
      for (let label of existingChart['labels']) {
        let index = xAxis.indexOf(label);
        if (index > -1)
          dataset['data'].push(yAxis[index]);
        else
          dataset['data'].push(0);
      }
    } else {
      dataset['data'] = yAxis;
    }
    
    // Bar or Line chart
    if (bar) {
      dataset['backgroundColor'] = this.randomColor();
    } else {
      dataset['fill'] = false;
      dataset['borderColor'] = this.randomColor();
      dataset['lineTension'] = 0;
    }
    
    // Set dataset
    if (!existingChart) {
      lineData['datasets'].push(dataset);
      return lineData;       
    } else {
      existingChart['datasets'].push(dataset);
      return existingChart;
    }
  }
  
  removeLineOrBarChartData(datasetName: string, existingChart: any) {
    if (existingChart) {
      if (Object.keys(existingChart).indexOf('datasets') > -1) {
        let i = 0;
        for (let dataset of existingChart['datasets']) {
          if (dataset['label'] == datasetName) {
            existingChart['datasets'].splice(i, 1);
            return existingChart;
          }
          i += 1;
        }
      }
    }
    return existingChart;
  }
  
  getValueByString(data: any, key: string) {
    if (!key)
      return null;
    let parts: any[] = key.split('.');
    let tmpValue = data;
    for (let part of parts) {
      if (tmpValue[part])
        tmpValue = tmpValue[part];
      else
        return null;
    }
    return tmpValue;
  }
  
  transformToPercentage(dataArr: number[]) {
    let sumOfData = 0;
    let percentageArr: number[] = [];
    for (let data of dataArr) {
      sumOfData += data;
    }
    if (sumOfData > 0) {
      for (let data of dataArr) {
        percentageArr.push(Math.round((data / sumOfData) * 10000) / 100);
      }
    }
    return percentageArr;
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

  createTableObject(obj: any, showFuture: boolean = false) {
    let res: any[] = [];
    for (let key of Object.keys(obj)) {
      let entry: any = {title: key};
      for (let subkey of Object.keys(obj[key])) {
        if (!showFuture || Date.parse(subkey) > Date.now())
          entry[subkey.split('-')[0]] = obj[key][subkey];
      }
      res.push(entry);
    }
    return res;
  }
  
  getColsFromData(arr: any[], newestFirst: boolean = true, showFuture: boolean = false) {
    let cols: any[] = [];
    if (!newestFirst)
      cols.push({field: 'title', header: 'title'});
    for (let key of Object.keys(arr)) {
      for (let subkey of Object.keys(arr[key])) {
        if (!showFuture || Date.parse(subkey) > Date.now())
          cols.push({field: subkey.split('-')[0], header: subkey.split('-')[0]});
      }
      if (cols && cols.length > 1) {
        if (newestFirst) {
          cols.push({field: 'title', header: ''});
          return cols.reverse();
        }
        return cols;
      } else
        return [];
    }
  }
  
  randomColor() {
    return "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
  }
  
}
