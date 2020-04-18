import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContestComponent } from './select-contest.component';

describe('SelectContestComponent', () => {
  let component: SelectContestComponent;
  let fixture: ComponentFixture<SelectContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
