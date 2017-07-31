import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksearchComponent } from './stocksearch.component';

describe('StocksearchComponent', () => {
  let component: StocksearchComponent;
  let fixture: ComponentFixture<StocksearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
