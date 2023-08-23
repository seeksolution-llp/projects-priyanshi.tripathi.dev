import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResrurantdashComponent } from './resrurantdash.component';

describe('ResrurantdashComponent', () => {
  let component: ResrurantdashComponent;
  let fixture: ComponentFixture<ResrurantdashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResrurantdashComponent]
    });
    fixture = TestBed.createComponent(ResrurantdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
