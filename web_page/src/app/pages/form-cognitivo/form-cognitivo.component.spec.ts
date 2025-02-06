import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCognitivoComponent } from './form-cognitivo.component';

describe('FormCognitivoComponent', () => {
  let component: FormCognitivoComponent;
  let fixture: ComponentFixture<FormCognitivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCognitivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCognitivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
