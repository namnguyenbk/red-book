import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedbookInfoComponent } from './redbook-info.component';

describe('RedbookInfoComponent', () => {
  let component: RedbookInfoComponent;
  let fixture: ComponentFixture<RedbookInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedbookInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedbookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
