import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRedbookComponent } from './edit-redbook.component';

describe('EditRedbookComponent', () => {
  let component: EditRedbookComponent;
  let fixture: ComponentFixture<EditRedbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRedbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRedbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
