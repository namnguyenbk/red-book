import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransComponent } from './add-trans.component';

describe('AddTransComponent', () => {
  let component: AddTransComponent;
  let fixture: ComponentFixture<AddTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
