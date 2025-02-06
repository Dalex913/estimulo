import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotricidadComponent } from './motricidad.component';

describe('MotricidadComponent', () => {
  let component: MotricidadComponent;
  let fixture: ComponentFixture<MotricidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MotricidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotricidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
