import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { Balance } from '../../balance';

@Component({
  selector: 'app-balancetable',
  templateUrl: './balancetable.component.html',
  styleUrls: ['./balancetable.component.css']
})
export class BalancetableComponent implements OnInit {
  @Input('balance') balance: Balance[];
  balanceValues: any[] = [];
  visibleValues: string[] = [];
  selectedRow: any;
  constructor() {
    this.visibleValues.push('currentAssets');
    this.visibleValues.push('goodwill');
    this.visibleValues.push('intangibles');
    this.visibleValues.push('totalAssets');
    this.visibleValues.push('currentLiabilities');
    this.visibleValues.push('longTermDebt');
    this.visibleValues.push('totalLiabilities');
    this.visibleValues.push('shareholderEquity');
  }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.balance.currentValue)
      this.balanceValues = this.removeUnvisibleRows(this.createTableObject(this.transposeData(changes.balance.currentValue)));
  }
  
  removeUnvisibleRows(data: any[]): any[] {
    let newData: any[] = [];
    for (let row of data) {
      if (this.visibleValues.indexOf(row.title) > -1)
        newData.push(row);
    }
    return newData;
  }
  
  fieldToLabelName(fieldName: string): string {
    if (fieldName) {
      switch (fieldName) {
        case 'currentAssets':
          return 'Current Assets';
        case 'totalAssets':
          return 'Total Assets';
        case 'goodwill':
          return 'Goodwill';
        case 'intangibles':
          return 'Intangibles';
        case 'currentLiabilities':
          return 'Current Liabilities';
        case 'totalLiabilities':
          return 'Total Liabilities';
        case 'longTermDebt':
          return 'Long-term Debt';
        case 'shareholderEquity':
          return 'Shareholder Equity';
      }
    }
    return '';
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

}
