import { TestBed } from '@angular/core/testing';

import { FormularioDataService } from './formulario-data.service';

describe('FormularioDataService', () => {
  let service: FormularioDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
