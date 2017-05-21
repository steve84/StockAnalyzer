import { Component, OnInit, OnChanges, SimpleChanges, EventEmitter, Input, Output } from '@angular/core';

import { StockService } from '../stock.service';

import { Fundamental } from '../fundamental';

@Component({
  selector: 'app-fundamental',
  templateUrl: './fundamental.component.html',
  styleUrls: ['./fundamental.component.css']
})
export class FundamentalComponent implements OnInit, OnChanges {
  @Input('display') display: boolean = false;
  @Input('symbol') symbol: Symbol;
  @Output('close') close: EventEmitter<boolean> = new EventEmitter<boolean>();
  private title: string;
  private fundamental: Fundamental;

  constructor(private stockService: StockService) {
    this.title = "Fundamental data";
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.display && changes.display.currentValue)
      this.getFundamentals();
  }

  getFundamentals() {
    if (this.symbol)
      this.stockService.getFundamental(this.symbol).subscribe((data:Fundamental) => this.fundamental = data);
  }

  closeDisplay() {
    this.display = false;
    this.close.emit(false);
  }

}
