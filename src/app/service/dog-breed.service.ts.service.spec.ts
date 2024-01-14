import { TestBed } from '@angular/core/testing';

import { DogBreedServiceTsService } from './dog-breed.service.ts.service';

describe('DogBreedServiceTsService', () => {
  let service: DogBreedServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DogBreedServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
