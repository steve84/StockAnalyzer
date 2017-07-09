import { Component, OnInit } from '@angular/core';

import { StockService } from '../stock.service';
import { IndexService } from '../index.service';

import { IndexType } from '../indextype';
import { Stock } from '../stock';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  private display: boolean = false;
  private title: string;
  private indices: IndexType[] = [];
  private selectedIndex: IndexType = null;
  private totalRecords: number = 0;
  private pageSize: number = 10;

  constructor(private stockService: StockService, private indexService: IndexService) {}

  ngOnInit() {}

  loadData(event: any) {
    this.getIndices(Math.floor(event.first / event.rows), event.sortField, event.sortOrder);
  }

  getIndices(page: number, sortField?: string, sortOrder?: number) {
    this.indexService.getIndices(page, this.pageSize, sortField, sortOrder).subscribe((data:any[]) => {
      this.indices = data['_embedded']['index'];
      this.totalRecords = data['page']['totalElements'];
      this.addStockIds();
    });
  }

  private addStockIds() {
    for (let index of this.indices) {
      index['levermannScore'] = 0;
      let totalMarketCap = 0;
      for (let stock of index['realStocks']) {
        if (stock.levermannScore && stock.levermann && stock.levermann.marketCapitalization) {
          totalMarketCap += stock.levermann.marketCapitalization;
          index['levermannScore'] += stock.levermannScore * stock.levermann.marketCapitalization;
        }
      }
      if (totalMarketCap > 0)
        index['levermannScore'] /= totalMarketCap;
    }
  }

  showIndexDetail(index: IndexType) {
    this.selectedIndex = index;
    this.display = true;
  }

  closeIndexDetail(display: boolean) {
    this.display = display;
  }

}
