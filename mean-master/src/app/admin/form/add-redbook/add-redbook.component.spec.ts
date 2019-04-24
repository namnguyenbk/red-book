import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRedbookComponent } from './add-redbook.component';

describe('AddRedbookComponent', () => {
  let component: AddRedbookComponent;
  let fixture: ComponentFixture<AddRedbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRedbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRedbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
