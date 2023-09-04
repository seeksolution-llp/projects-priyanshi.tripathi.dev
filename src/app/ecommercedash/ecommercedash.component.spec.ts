import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommercedashComponent } from './ecommercedash.component';

describe('EcommercedashComponent', () => {
  let component: EcommercedashComponent;
  let fixture: ComponentFixture<EcommercedashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EcommercedashComponent]
    });
    fixture = TestBed.createComponent(EcommercedashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
