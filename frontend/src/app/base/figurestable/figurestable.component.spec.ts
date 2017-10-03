import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FigurestableComponent } from './figurestable.component';

describe('FigurestableComponent', () => {
  let component: FigurestableComponent;
  let fixture: ComponentFixture<FigurestableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FigurestableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FigurestableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
