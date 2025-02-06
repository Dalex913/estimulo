import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMotricidadComponent } from './form-motricidad.component';

describe('FormMotricidadComponent', () => {
  let component: FormMotricidadComponent;
  let fixture: ComponentFixture<FormMotricidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormMotricidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormMotricidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
