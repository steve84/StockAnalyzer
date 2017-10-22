import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

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
  @Output() onRowSelect: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges) {
  }
  
  selectRow(event: any) {
    this.onRowSelect.emit(event.data);
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
        entry[subkey.split('-')[0]] = obj[key][subkey];
      }
      res.push(entry);
    }
    return res;
  }
  
  getColsFromData(arr: any[]) {
    let cols: any[] = [];
    cols.push({field: 'title', header: 'title'});
    for (let key of Object.keys(arr)) {
      for (let subkey of Object.keys(arr[key])) {
        cols.push({field: subkey.split('-')[0], header: subkey.split('-')[0]});
      }
      return cols;
    }
  }

}
