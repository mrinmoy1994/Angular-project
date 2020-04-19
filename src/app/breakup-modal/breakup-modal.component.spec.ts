import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { breakupmodalComponent } from './breakup-modal.component';

describe('breakupmodalComponent', () => {
  let component: breakupmodalComponent;
  let fixture: ComponentFixture<breakupmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ breakupmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(breakupmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
