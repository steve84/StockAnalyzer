import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { SelectItem } from 'primeng/primeng';

import { Balance } from '../../balance';

@Component({
  selector: 'app-balancesheet',
  templateUrl: './balancesheet.component.html',
  styleUrls: ['./balancesheet.component.css']
})
export class BalancesheetComponent implements OnInit, OnChanges {
  @Input('balance') balance: Balance[];
  actualBalance: Balance;
  year: string;
  years: SelectItem[] = [];
  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.balance && changes.balance.currentValue) {
      let tmpYears = [];
      for (let b of changes.balance.currentValue) {
        let year = b.modifiedAt.split('-')[0];
        tmpYears.push({label: year, value: year});
      }
      tmpYears.reverse();
      this.years = tmpYears;
      if (!this.year && this.years.length > 0) {
        this.year = this.years[0]['value'];
        this.setBalance();
      }
    }
  }
  
  setYear(event: any) {
    this.year = event.value;
    this.setBalance();
  }
  
  setBalance() {
    for (let b of this.balance) {
      if (b.modifiedAt.split('-')[0] == this.year) {
        this.actualBalance = b;
        break;
      }
    }
  }

}
