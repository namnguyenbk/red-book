import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransHistoryComponent } from './trans-history.component';

describe('TransHistoryComponent', () => {
  let component: TransHistoryComponent;
  let fixture: ComponentFixture<TransHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
