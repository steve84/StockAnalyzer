import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexdetailComponent } from './indexdetail.component';

describe('IndexdetailComponent', () => {
  let component: IndexdetailComponent;
  let fixture: ComponentFixture<IndexdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
