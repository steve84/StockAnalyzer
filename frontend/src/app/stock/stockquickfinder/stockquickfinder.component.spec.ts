import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockquickfinderComponent } from './stockquickfinder.component';

describe('StockquickfinderComponent', () => {
  let component: StockquickfinderComponent;
  let fixture: ComponentFixture<StockquickfinderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockquickfinderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockquickfinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
