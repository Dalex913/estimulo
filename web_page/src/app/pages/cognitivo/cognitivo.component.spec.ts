import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CognitivoComponent } from './cognitivo.component';

describe('CognitivoComponent', () => {
  let component: CognitivoComponent;
  let fixture: ComponentFixture<CognitivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CognitivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CognitivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
