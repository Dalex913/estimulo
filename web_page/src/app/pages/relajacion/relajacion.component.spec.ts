import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelajacionComponent } from './relajacion.component';

describe('RelajacionComponent', () => {
  let component: RelajacionComponent;
  let fixture: ComponentFixture<RelajacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelajacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelajacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
