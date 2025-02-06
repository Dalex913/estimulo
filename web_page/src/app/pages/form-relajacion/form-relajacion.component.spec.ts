import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRelajacionComponent } from './form-relajacion.component';

describe('FormRelajacionComponent', () => {
  let component: FormRelajacionComponent;
  let fixture: ComponentFixture<FormRelajacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRelajacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRelajacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
