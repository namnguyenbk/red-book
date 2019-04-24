import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedbookComponent } from './redbook.component';

describe('RedbookComponent', () => {
  let component: RedbookComponent;
  let fixture: ComponentFixture<RedbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
