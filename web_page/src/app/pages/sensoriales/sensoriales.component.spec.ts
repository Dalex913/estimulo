import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorialesComponent } from './sensoriales.component';

describe('SensorialesComponent', () => {
  let component: SensorialesComponent;
  let fixture: ComponentFixture<SensorialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SensorialesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SensorialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
