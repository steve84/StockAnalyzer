import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecombinerComponent } from './scorecombiner.component';

describe('ScorecombinerComponent', () => {
  let component: ScorecombinerComponent;
  let fixture: ComponentFixture<ScorecombinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecombinerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecombinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
