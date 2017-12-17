import { Component, OnInit } from '@angular/core';

import { StockService } from '../stock.service';
import { IndexService } from '../index.service';
import { HelperService} from '../../helper.service';

import { IndexType } from '../indextype';
import { Stock } from '../stock';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  display: boolean = false;
  title: string;
  indices: IndexType[] = [];
  selectedIndex: IndexType = null;
  totalRecords: number = 0;
  pageSize: number = 10;
  loading: boolean = false;

  constructor(private stockService: StockService,
              private indexService: IndexService,
              private helperService: HelperService,) {}

  ngOnInit() {}

  loadData(event: any) {
    this.loading = true;
    this.getIndices(Math.floor(event.first / event.rows), event.sortField, event.sortOrder);
  }

  getIndices(page: number, sortField?: string, sortOrder?: number) {
    this.indexService.getIndices(page, this.pageSize, sortField, sortOrder).subscribe((data:any[]) => {
      this.indices = data['_embedded']['index'];
      this.totalRecords = data['page']['totalElements'];
      this.addStockIds();
    }, (err:any) => {
      this.loading = false;
      this.helperService.handleError(err);
    });
  }

  private addStockIds() {
    for (let index of this.indices) {
      index['levermannScore'] = 0;
      let totalMarketCap = 0;
      for (let stock of index['realStocks']) {
        if (stock.scores && stock.scores.length > 0 && stock.levermann.marketCapitalization) {
          for (let score of stock.scores) {
            if (score['scoreType']['name'] == "Levermann") {
              totalMarketCap += stock.levermann.marketCapitalization;
              index['levermannScore'] += score['scoreValue'] * stock.levermann.marketCapitalization;
            }
          }
        }
      }
      if (totalMarketCap > 0)
        index['levermannScore'] /= totalMarketCap;
    }
    this.loading = false;
  }

  showIndexDetail(index: IndexType) {
    this.selectedIndex = index;
    this.indexService.getIndexEmitter().emit(index);
  }
}
