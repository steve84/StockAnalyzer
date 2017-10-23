import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagicformulaComponent } from './magicformula.component';

describe('MagicformulaComponent', () => {
  let component: MagicformulaComponent;
  let fixture: ComponentFixture<MagicformulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagicformulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagicformulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
