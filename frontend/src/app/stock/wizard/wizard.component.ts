import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';

import { MenuItem, TreeNode, Message } from 'primeng/primeng';

import { StockService } from '../stock.service';
import { IndexService } from '../index.service';
import { HelperService} from '../../helper.service';
import { UserService} from '../../user.service';

import { Country } from '../country';
import { Branch } from '../branch';
import { Stock } from '../stock';
import { IndexType } from '../indextype';
import { Score } from '../score';

import { CountryTranslationPipe } from '../country_translation.pipe';
import { BranchTranslationPipe } from '../branch_translation.pipe';
import { CommonTranslationPipe } from '../common_translation.pipe';
import { MessageTranslationPipe } from '../message_translation.pipe';
import { RegionPipe } from '../region.pipe';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  items: MenuItem[];
  defaultItems: MenuItem[];
  activeIndex: number = 0;
  
  countryIds: number[];
  branchIds: number[];
  branchNodeTree: TreeNode[] = [];
  selectedBranchNodes: TreeNode[];
  countryNodeTree: TreeNode[] = [];
  selectedCountryNodes: TreeNode[];
  selectedStrategy: string;
  selectedStrategyRow: any;
  strategies: any;
  stockOrIndex: string = 'stock';
  numRows: number = 30;
  selectedCompanySize: string = "0";
  
  loading: boolean = false;
  scores: Score[];
  selectedScore: Score;
  
  msgs: Message[] = [];
  
  countryTranslationPipe: CountryTranslationPipe = new CountryTranslationPipe('en-US');
  branchTranslationPipe: BranchTranslationPipe = new BranchTranslationPipe('en-US');
  regionTranslationPipe: RegionPipe = new RegionPipe('en-US');
  commonTranslationPipe: CommonTranslationPipe = new CommonTranslationPipe('en-US');
  messageTranslationPipe: MessageTranslationPipe = new MessageTranslationPipe('en-US');
  constructor(private stockService: StockService,
              private indexService: IndexService,
              private helperService: HelperService,
              private userService: UserService,
              @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.defaultItems = [
      {label: this.commonTranslationPipe.transform('Asset class', this.locale)},
      {label: this.commonTranslationPipe.transform('Strategy', this.locale)},
      {label: this.commonTranslationPipe.transform('Countries/Regions', this.locale)},
      {label: this.commonTranslationPipe.transform('Branches', this.locale)},
      {label: this.commonTranslationPipe.transform('Company sizes', this.locale)},
      {label: this.commonTranslationPipe.transform('Result', this.locale)}
    ];
    
    this.items = this.defaultItems;
    
    this.strategies = [
      {value: '1', title: this.commonTranslationPipe.transform('Pure Levermann', this.locale), levermann: 100, magic: 0, piotroski: 0},
      {value: '2', title: this.commonTranslationPipe.transform('Pure Magic Formula', this.locale), levermann: 0, magic: 100, piotroski: 0},
      {value: '3', title: this.commonTranslationPipe.transform('Pure Piotroski F-Score', this.locale), levermann: 0, magic: 0, piotroski: 100},
      {value: '4', title: this.commonTranslationPipe.transform('Levermann + Magic Formula', this.locale), levermann: 50, magic: 50, piotroski: 0},
      {value: '5', title: this.commonTranslationPipe.transform('Levermann + Piotroski F-Score', this.locale), levermann: 50, magic: 0, piotroski: 50},
      {value: '6', title: this.commonTranslationPipe.transform('Magic Formula + Piotroski F-Score', this.locale), levermann: 0, magic: 50, piotroski: 50},
      {value: '7', title: this.commonTranslationPipe.transform('All', this.locale), levermann: 33.33, magic: 33.33, piotroski: 33.33}
    ];
    
    this.branchNodeTree.push({label: this.branchTranslationPipe.transform('All', this.locale), children: [], selectable: true});
    this.countryNodeTree.push({label: this.regionTranslationPipe.transform('World', this.locale), children: [], selectable: true});

    this.stockService.getAllCountries()
      .subscribe((data:any) => {
        this.countryIds = [];
        if (data && Object.keys(data).indexOf("_embedded") > -1 && Object.keys(data._embedded).indexOf("countries") > -1)
          for (let country of data._embedded.countries) {
            this.countryIds.push(country.countryId);
            this.insertCountryToTree(country);
          }
      }, (err:any) => this.helperService.handleError(err));

    this.stockService.getAllBranches()
      .subscribe((data:any) => {
        this.branchIds = [];
        if (data && Object.keys(data).indexOf("_embedded") > -1 && Object.keys(data._embedded).indexOf("branches") > -1)
          for (let branch of data._embedded.branches) {
            this.branchIds.push(branch.branchId);
            this.insertBranchToTree(branch);
          }
      }, (err:any) => this.helperService.handleError(err));
  }
  
  getScoreValues() {
    let fromMarketCap: number = null;
    let toMarketCap: number = null;
    switch (this.selectedCompanySize) {
      // 'Large and Mid Caps'
      case '1':
        fromMarketCap = 2000;
        break;
      // 'Large Caps'
      case '2':
        fromMarketCap = 10000;
        break;
      // 'Mid Caps'
      case '3':
        fromMarketCap = 2000;
        toMarketCap = 10000;
        break;
      // 'Small Caps'
      case '4':
        toMarketCap = 2000;
    }
    this.loading = true;
    if (this.stockOrIndex == 'stock') {
      this.stockService.getNormalizedScores(this.selectedStrategyRow.levermann / 100, this.selectedStrategyRow.magic / 100, this.selectedStrategyRow.piotroski / 100, this.inverseArray(this.selectedCountryNodes, this.countryIds), this.inverseArray(this.selectedBranchNodes, this.branchIds), fromMarketCap, toMarketCap, this.numRows)
        .subscribe((data: any) => {
        this.scores = data["_embedded"]["normalizedscore"];
        if (this.scores && this.scores.length > 0) {
          let nbrOfScores = this.scores.length;
          for (let score of this.scores) {
            this.stockService.getStockFromNormalizedValue(score.scoreId)
              .subscribe((data:Stock) => {
                score.stock = data;
                nbrOfScores--;
                if (nbrOfScores == 0)
                  this.loading = false;
              }, (err:any) => {
                nbrOfScores--;
                if (nbrOfScores == 0)
                  this.loading = false;
                this.helperService.handleError(err);
              });
          }
        } else {
          this.loading = false;
        }
      }, (err:any) => {
        this.loading = false;
        this.helperService.handleError(err);
      });
    } else {
      this.indexService.getNormalizedScores(this.selectedStrategyRow.levermann / 100, this.selectedStrategyRow.magic / 100, this.selectedStrategyRow.piotroski / 100, this.inverseArray(this.selectedCountryNodes, this.countryIds), this.numRows)
        .subscribe((data: any) => {
        this.scores = data["_embedded"]["normalizedscore"];
        let nbrOfScores = this.scores.length;
        for (let score of this.scores) {
          this.indexService.getIndexFromNormalizedValue(score.scoreId)
            .subscribe((data:IndexType) => {
              score.index = data;
              nbrOfScores--;
              if (nbrOfScores == 0)
                this.loading = false;
            }, (err:any) => {
              nbrOfScores--;
              if (nbrOfScores == 0)
                this.loading = false;
              this.helperService.handleError(err);
            });
        }
      }, (err:any) => {
        this.loading = false;
        this.helperService.handleError(err);
      });
    }
  }
  
  insertBranchToTree(branch: Branch) {
    let index = -1;
    let i = 0;
    for (let rootNode of this.branchNodeTree[0].children) {
      if (rootNode.label == branch.branchGroup) {
        index = i;
        break;
      }
      i++;
    }
    if (index > -1)
      this.branchNodeTree[0].children[index].children.push({label: this.branchTranslationPipe.transform(branch.name, this.locale), data: branch.branchId, selectable: true});
    else {
      let newNode = {label: this.branchTranslationPipe.transform(branch.branchGroup, this.locale), selectable: true, children: [{label: this.branchTranslationPipe.transform(branch.name, this.locale), data: branch.branchId, selectable: true}]};
      this.branchNodeTree[0].children.push(newNode);
    }
  }

  insertCountryToTree(country: Country) {
    let index = -1;
    let i = 0;
    for (let rootNode of this.countryNodeTree[0].children) {
      if (rootNode.label == this.regionTranslationPipe.transform(country.name)) {
        index = i;
        break;
      }
      i++;
    }
    if (index > -1)
      this.countryNodeTree[0].children[index].children.push({label: this.countryTranslationPipe.transform(country.name, this.locale), data: country.countryId, selectable: true});
    else {
      let newNode = {label: this.regionTranslationPipe.transform(country.name, this.locale), selectable: true, children: [{label: this.countryTranslationPipe.transform(country.name, this.locale), data: country.countryId, selectable: true}]};
      this.countryNodeTree[0].children.push(newNode);
    }
  }

  showStock(score: Score) {
    this.selectedScore = score;
    this.stockService.getStockEmitter().emit(this.selectedScore.stock);
  }

  showIndex(score: Score) {
    this.selectedScore = score;
    this.indexService.getIndexEmitter().emit(this.selectedScore.index);
  }
  
  setIndex(index: number) {
    if (index != this.items.length - 1 || this.allStepsValid()) {
      this.activeIndex = index;
      if (index == this.items.length - 1) {
        this.getScoreValues();
      }
      this.msgs = [];
    } else
      this.msgs = [{severity: 'error', summary: '', detail: this.messageTranslationPipe.transform(24, this.locale)}];
  }
  
  allStepsValid() {
    if (this.stockOrIndex == 'stock')
      return this.selectedBranchNodes && this.selectedBranchNodes.length > 0 && this.selectedCountryNodes && this.selectedCountryNodes.length > 0 && this.selectedStrategy && this.selectedStrategy != '';
    else
      return this.selectedCountryNodes && this.selectedCountryNodes.length > 0 && this.selectedStrategy && this.selectedStrategy != '';
  }

  selectStrategy(event: any) {
    this.selectedStrategy = event.data.value;
  }
  
  inverseArray(selectedEntities: TreeNode[], ids: number[]) {
    let invArr = [];
    let selectedArr = this.getSelectedIds(selectedEntities);
    for (let id of ids) {
      if (selectedArr.indexOf(id) == -1) {
        invArr.push(id);
      }
    }
    return invArr;
  }
  
  getSelectedIds(selectedNodes: TreeNode[]) {
    let retArr = [];
    for (let node of selectedNodes) {
      if (node.data)
        retArr.push(node.data);
    }
    return retArr;
  }
  
  setSteps(assetClass: string) {
    if (assetClass == 'index') {
      if (this.items.length == this.defaultItems.length) {
        let steps = [];
        let i = 0;
        let removeIndices = [3,4];
        for (let item of this.items) {
          if (removeIndices.indexOf(i) == -1) {
            steps.push(item);
          }
          i += 1;
        }
        this.items = steps;
      }
    } else {
      this.items = this.defaultItems;
    }
  }

  compare() {
    this.userService.compare();
  }
  
  addCompare(stock: Stock) {
    this.userService.addCompare(stock.stockId);
  }
  
  removeCompare(stock: Stock) {
    this.userService.removeCompare(stock.stockId);
  }
  
  resetCompare() {
    this.userService.resetCompare();
  }
  
  getCompareSize(): number {
    return this.userService.getCompareSize();
  }
  
  getCompareLabel() {
    return this.userService.getCompareLabel();
  }

  getCompareItems(): MenuItem[] {
    return this.userService.getCompareItems();
  }
  
  isStockInCompare(stock: Stock): boolean {
    return this.userService.isStockInCompare(stock.stockId);
  }

  getCssLevermann(stock: Stock, value: number) {
    if (stock && stock.marketCapitalization && value) {
      if (stock.marketCapitalization.marketCapitalization >= 10) {
        if (value >= 4)
          return {'background': 'green', 'color': 'white', 'padding': '3px'};
      } else {
        if (value >= 7)
          return {'background': 'green', 'color': 'white', 'padding': '3px'};
      }
    }
    return {};
  }

  getCssPiotroski(value: number) {
    if (value >= 8)
      return {'background': 'green', 'color': 'white', 'padding': '3px'};
    else
      return {};
  }
}
