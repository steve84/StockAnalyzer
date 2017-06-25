import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevermannComponent } from './levermann.component';

describe('LevermannComponent', () => {
  let component: LevermannComponent;
  let fixture: ComponentFixture<LevermannComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevermannComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevermannComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
