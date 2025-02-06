import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSensorialComponent } from './form-sensorial.component';

describe('FormSensorialComponent', () => {
  let component: FormSensorialComponent;
  let fixture: ComponentFixture<FormSensorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSensorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSensorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
