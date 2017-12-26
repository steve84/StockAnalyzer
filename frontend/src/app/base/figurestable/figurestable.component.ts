import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ChangeDetectionStrategy, Inject, LOCALE_ID } from '@angular/core';

import { HelperService} from '../../helper.service';

@Component({
  selector: 'app-figurestable',
  templateUrl: './figurestable.component.html',
  styleUrls: ['./figurestable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FigurestableComponent implements OnInit, OnChanges {
  @Input('data') data: any[];
  @Input('fields') fields: any[];
  @Input('labels') labels: any;
  @Input('currency') currency: string = 'USD';
  @Input('showFuture') showFuture: boolean = false;
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output() onRowUnselect: EventEmitter<any> = new EventEmitter<any>();
  constructor(private helperService: HelperService,
              @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
  }
  
  selectRow(event: any) {
    this.onRowSelect.emit(event.data);
  }

  unselectRow(event: any) {
    this.onRowUnselect.emit(event.data);
  }
  
  getEmptyMessage() {
    return this.helperService.getEmptyMessage(this.locale);
  }
  
  removeUnvisibleRows(data: any[]): any[] {
    let newData: any[] = [];
    for (let row of data) {
      if (this.fields.indexOf(row.title) > -1)
        newData.push(row);
    }
    return newData;
  }
  
  fieldToLabelName(fieldName: string): string {
    if (Object.keys(this.labels).indexOf(fieldName) > -1)
        return this.labels[fieldName];
    return fieldName;
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
        if (!this.showFuture || Date.parse(subkey) > Date.now())
          entry[subkey.split('-')[0]] = obj[key][subkey];
      }
      res.push(entry);
    }
    return res;
  }
  
  getColsFromData(arr: any[], newestFirst: boolean = true) {
    let cols: any[] = [];
    if (!newestFirst)
      cols.push({field: 'title', header: 'title'});
    for (let key of Object.keys(arr)) {
      for (let subkey of Object.keys(arr[key])) {
        if (!this.showFuture || Date.parse(subkey) > Date.now())
          cols.push({field: subkey.split('-')[0], header: subkey.split('-')[0]});
      }
      if (cols && cols.length > 1) {
        if (newestFirst) {
          cols.push({field: 'title', header: ''});
          return cols.reverse();
        }
        return cols;
      } else
        return [];
    }
  }

}
