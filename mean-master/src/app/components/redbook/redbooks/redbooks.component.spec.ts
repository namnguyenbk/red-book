import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedbooksComponent } from './redbooks.component';

describe('RedbooksComponent', () => {
  let component: RedbooksComponent;
  let fixture: ComponentFixture<RedbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
