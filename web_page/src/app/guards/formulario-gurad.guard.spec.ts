import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { formularioGuradGuard } from './formulario-gurad.guard';

describe('formularioGuradGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formularioGuradGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
