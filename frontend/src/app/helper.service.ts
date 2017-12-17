import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

import {MessageService} from 'primeng/components/common/messageservice';

import {Message} from 'primeng/primeng';

import { MessageTranslationPipe } from './stock/message_translation.pipe';

@Injectable()
export class HelperService {
  previousUrl: string;
  nextUrl: string;
  messagePipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
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
  
  addGlobalMessage(msg: Message, isSingleMsg: boolean = true) {
    if (isSingleMsg)
      this.messageService.clear();
    this.messageService.add(msg);
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
  
  
  createLineChartData(datasetName: string, xAxis: string[], yAxis: number[], existingChart?: any) {
    let lineData = {};
    if (!existingChart) {
      lineData['labels'] = xAxis;
      lineData['datasets'] = [];
    }
    let dataset = {};
    dataset['label'] = datasetName;
    dataset['data'] = yAxis;
    dataset['fill'] = false;
    dataset['borderColor'] = this.randomColor();
    dataset['lineTension'] = 0;
    if (!existingChart) {
      lineData['datasets'].push(dataset);
      return lineData;       
    } else {
      existingChart['datasets'].push(dataset);
      return existingChart;
    }
  }

  removeLineChartData(datasetName: string, existingChart: any) {
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
  
  randomColor() {
    return "rgb(" + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")";
  }
  
}
