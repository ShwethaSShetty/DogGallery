
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DogBreedServiceService } from './dog-breed.service';
import { BreedsListResponse, MultipleImagesResponse, SingleImageResponse, SubBreedsListResponse } from '../shared/types/breed-types';

describe('DogBreedServiceTsService', () => {
  let service: DogBreedServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DogBreedServiceService ]
    });
    service = TestBed.inject(DogBreedServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the breed list from the API via GET', () => {
    const breedListResponse: BreedsListResponse = {
      status: 'success',
      message: { "affenpinscher": [] }
    };
    service.getBreedList().subscribe(response => {
      expect(response).toEqual(breedListResponse);
    });

    const req = httpMock.expectOne(`https://dog.ceo/api/breeds/list/all`);
    expect(req.request.method).toBe('GET');
    req.flush(breedListResponse);
  });

  it('should retrieve the sub-breed list from the API via GET', () => {
    const breed = "bulldog";

    const subBreedResponse: SubBreedsListResponse = {
      status: 'success',
      message: ["afghan"],
    };

    service.getSubBreedList(breed).subscribe(response => {
      expect(response).toEqual(subBreedResponse);
    });

    const req = httpMock.expectOne(`https://dog.ceo/api/breed/${breed}/list`);
    expect(req.request.method).toBe('GET');
    req.flush(subBreedResponse);
  });

  it('should retrieve the random dog images from the API via GET', () => {
    const numberOfImages = 3;
    const partialUrl = 'breeds'

    const randomImagesResponse: SingleImageResponse| MultipleImagesResponse = {
      status: 'success',
      message: [ "https://images.dog.ceo/breeds/groenendael/n02105056_4283.jpg",
      "https://images.dog.ceo/breeds/pointer-germanlonghair/hans3.jpg",
      "https://images.dog.ceo/breeds/cockapoo/Guri6.jpg"],
    };

    service.getRandomDogImage(numberOfImages, partialUrl).subscribe(response => {
      expect(response).toEqual(randomImagesResponse);
    });

    const req = httpMock.expectOne(`https://dog.ceo/api/${partialUrl}/image/random/${numberOfImages}`);
    expect(req.request.method).toBe('GET');
    req.flush(randomImagesResponse);
  });

  it('should retrieve dog images by breed from the API via GET', () => {
    const breedUrl = 'bulldog/boston';

    const imgResponse: SingleImageResponse = {
      status: 'success',
      message: "https://images.dog.ceo/breeds/setter-english/n02100735_6707.jpg",
    };

    service.getDogImagesByBreed(breedUrl).subscribe(response => {
      expect(response).toEqual(imgResponse);
    });

    const req = httpMock.expectOne(`https://dog.ceo/api/breed/${breedUrl}/images`);
    expect(req.request.method).toBe('GET');
    req.flush(imgResponse);
  });

});
