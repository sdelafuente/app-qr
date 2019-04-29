import { TestBed } from '@angular/core/testing';

import { CargadorService } from './cargador.service';

describe('CargadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CargadorService = TestBed.get(CargadorService);
    expect(service).toBeTruthy();
  });
});
