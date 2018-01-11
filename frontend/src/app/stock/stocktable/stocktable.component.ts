import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, Inject, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/primeng';

import { StockService} from '../stock.service';
import { IndexService} from '../index.service';
import { HelperService} from '../../helper.service';

import { Stock } from '../stock';
import { IndexType } from '../indextype';
import { StockIndexImpl } from '../stockindex';

import { CommonTranslationPipe } from '../common_translation.pipe';

@Component({
  selector: 'app-stocktable',
  templateUrl: './stocktable.component.html',
  styleUrls: ['./stocktable.component.css']
})
export class StockTableComponent implements OnInit, OnChanges {
  stocks: Stock[] = [];
  selectedStock: Stock = null;
  display: boolean = false;
  lazy: boolean = true;
  compareIds: number[] = [];
  compareItems: MenuItem[] = [];
  commonTranslationPipe: CommonTranslationPipe = new CommonTranslationPipe('en_US');
  @Input('loading') loading: boolean = false;
  @Input('totalRecords') totalRecords: number = 0;
  @Input('pageSize') pageSize: number = 20;
  @Input('stocks') stocksInput: Stock[];
  @Input('external') external: boolean = false;
  @Input('compareActive') compareActive: boolean = true;
  @Output() onLazyLoad: EventEmitter<any> = new EventEmitter<any>();
  constructor(@Inject(LOCALE_ID) private locale: string,
              private stockService: StockService,
              private indexService: IndexService,
              private helperService: HelperService,
              private router: Router) {}
              
  ngOnChanges(changes: SimpleChanges) {
    if (changes.stocksInput && changes.stocksInput.currentValue) {
      this.stocks = changes.stocksInput.currentValue;
    }
  }

  loadData(event: any) {
    if (this.external) {
      this.onLazyLoad.emit(event);
    } else {
      this.loading = true;
      this.pageSize = event.rows;
      this.getStocks(Math.floor(event.first / event.rows), event.sortField, event.sortOrder);
    }
  }

  getStocks(page: number, sortField?: string, sortOrder?: number) {
    this.stockService.getStocks(page, this.pageSize, sortField, sortOrder).subscribe((data:any[]) => {
      this.stocks = data['_embedded']['stock'];
      this.totalRecords = data['page']['totalElements'];
      this.addIndices();
      this.loading = false;
    }, (err:any) => {
      this.loading = false;
      this.helperService.handleError(err);
    });
  }

  private addIndices() {
    for (let stock of this.stocks) {
      stock.stockIndex = [];
      stock.indexNames = Object.keys(stock.indexParticipation).join(', ');
      for (let index of stock.indices) {
        if (index['_links'] && index['_links']['index']) {
          this.indexService.getIndexByLink(index['_links']['index']['href'])
            .subscribe((data:IndexType) => {
              let stockIndex: StockIndexImpl = new StockIndexImpl();
              stockIndex.percentage = index.percentage;
              stockIndex.indexId = data.indexId;
              stockIndex.stockId = stock.stockId;
              stock.stockIndex.push(stockIndex);
            }, (err:any) => {
              this.loading = false;
              this.helperService.handleError(err);
            });
        }
      }
    }
  }
  
  getCssLevermann(stock: Stock, value: number) {
    if (stock.marketCapitalization.marketCapitalization >= 10) {
      if (value >= 4)
        return {'background': 'green', 'color': 'white', 'padding': '3px'};
    } else {
      if (value >= 7)
        return {'background': 'green', 'color': 'white', 'padding': '3px'};
    }
  }

  getCssPiotroski(value: number) {
    if (value >= 8)
      return {'background': 'green', 'color': 'white', 'padding': '3px'};
    else
      return {};
  }
  
  getEmptyMessage() {
    return this.helperService.getEmptyMessage(this.locale);
  }
  
  showFundamental(stock: Stock) {
    this.selectedStock = stock;
    //this.router.navigate(['/stocks', this.selectedStock.stockId]);
    this.stockService.getStockEmitter().emit(this.selectedStock);
  }

  closeFundamental(display: boolean) {
    this.display = display;
  }
  
  compare() {
    this.router.navigate(['/compare']);
  }
  
  addCompare(stock: Stock) {
    this.compareIds.push(stock.stockId);
    this.helperService.setLocalStorageItem('compare', this.compareIds);
  }
  
  removeCompare(stock: Stock) {
    this.compareIds.splice(this.compareIds.indexOf(stock.stockId), 1);
    this.helperService.setLocalStorageItem('compare', this.compareIds);
  }
  
  resetCompare() {
    this.compareIds = [];
    this.helperService.setLocalStorageItem('compare', this.compareIds);
  }
  
  getCompareSize(): number {
    return this.compareIds.length;
  }
  
  getCompareLabel() {
    return this.commonTranslationPipe.transform("Compare selection", this.locale) + " (" + this.getCompareSize() + ")";
  }
  
  isStockInCompare(stock: Stock): boolean {
    return this.compareIds.indexOf(stock.stockId) > -1;
  }

  ngOnInit() {
    if (this.helperService.isKeyInLocalStorage('compare')) {
      this.compareIds = this.helperService.getLocalStorageItem('compare');
      if (this.compareIds && this.compareIds.length > 0)
        this.compareItems = [{label: this.commonTranslationPipe.transform("Cancel selection", this.locale), icon: 'fa-ban', command: () => { this.resetCompare(); }}];
    }
  }
}
