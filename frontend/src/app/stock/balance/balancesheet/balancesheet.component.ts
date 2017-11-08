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
      this.years = [];
      for (let b of changes.balance.currentValue) {
        let year = b.modifiedAt.split('-')[0];
        this.years.push({label: year, value: year});
        if (!this.year) {
          this.year = year;
          this.setBalance();
        }
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
