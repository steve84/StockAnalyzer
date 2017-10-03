import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancesheetComponent } from './balancesheet.component';

describe('BalancesheetComponent', () => {
  let component: BalancesheetComponent;
  let fixture: ComponentFixture<BalancesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
