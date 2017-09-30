import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancetableComponent } from './balancetable.component';

describe('BalancetableComponent', () => {
  let component: BalancetableComponent;
  let fixture: ComponentFixture<BalancetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
