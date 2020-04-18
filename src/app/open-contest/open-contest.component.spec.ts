import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenContestComponent } from './open-contest.component';

describe('OpenContestComponent', () => {
  let component: OpenContestComponent;
  let fixture: ComponentFixture<OpenContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
