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
  
  getHelperService() {
    return this.helperService;
  }
}
