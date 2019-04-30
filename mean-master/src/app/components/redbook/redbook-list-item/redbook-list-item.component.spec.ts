import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedbookListItemComponent } from './redbook-list-item.component';

describe('RedbookListItemComponent', () => {
  let component: RedbookListItemComponent;
  let fixture: ComponentFixture<RedbookListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedbookListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedbookListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
