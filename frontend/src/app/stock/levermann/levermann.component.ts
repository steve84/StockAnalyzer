import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

import { StockService } from '../stock.service';

import { Stock } from '../stock';
import { Levermann } from '../levermann';

@Component({
  selector: 'app-levermann',
  templateUrl: './levermann.component.html',
  styleUrls: ['./levermann.component.css']
})
export class LevermannComponent implements OnInit, OnChanges {
  @Input('stock') stock: Stock;
  levermannData: Levermann;
  levermannAdvice: string = "nicht kaufen/verkaufen";
  constructor(private stockService: StockService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.stock && changes.stock.currentValue) {
      this.levermannData = changes.stock.currentValue.levermann;
    }
  }
}
