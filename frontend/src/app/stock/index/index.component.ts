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
  indices: IndexType[] = [];
  private selectedIndex: IndexType = null;
  private display: boolean = false;
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
      for (let stock of index['stocks']) {
        if (stock['_links'] && stock['_links']['stock']) {
          this.stockService.getStockByLink(stock['_links']['stock']['href'])
            .subscribe((data:Stock) => {
              index['stocks'].push(data);
            });
        }
      }
      index['numberOfStocks'] = index['stocks'].length;
    }
  }

}
