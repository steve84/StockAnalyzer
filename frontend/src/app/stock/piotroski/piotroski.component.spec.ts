import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiotroskiComponent } from './piotroski.component';

describe('PiotroskiComponent', () => {
  let component: PiotroskiComponent;
  let fixture: ComponentFixture<PiotroskiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiotroskiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiotroskiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
