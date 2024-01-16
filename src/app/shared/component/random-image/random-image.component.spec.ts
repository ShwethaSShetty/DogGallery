import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { of } from 'rxjs';

import { RandomImageComponent } from './random-image.component';
import { DogBreedServiceService } from '../../../service/dog-breed.service';

describe('RandomImageComponent', () => {
  let component: RandomImageComponent;
  let fixture: ComponentFixture<RandomImageComponent>;
  let mockDogBreedServiceService: jasmine.SpyObj<DogBreedServiceService>;

  beforeEach(async () => {

    mockDogBreedServiceService = jasmine.createSpyObj<DogBreedServiceService>(DogBreedServiceService.name, ["getRandomDogImage","getDogImagesByBreed"]);

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatCheckboxModule,
        MatRadioModule,
        RandomImageComponent
      ],
      providers: [ { provide: DogBreedServiceService, useValue: mockDogBreedServiceService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomImageComponent);
    component = fixture.componentInstance;

    mockDogBreedServiceService.getRandomDogImage.and.callFake((count, url) => of({'message': Array(count).fill('url'), 'status': 'success'}));

    mockDogBreedServiceService.getDogImagesByBreed.and.callFake((url) => of({'message': url, 'status': 'success'}));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change image count properly', () => {
    component.randomImgCount = 5;
    component.changeRandomImageDisplayCount();
    expect(component.showError).toBeFalsy();
  });

  it('should show error for invalid image count', () => {
    component.randomImgCount = 0;
    component.changeRandomImageDisplayCount();
    expect(component.showError).toBeTruthy();
  });

  it('should properly get multiple random images', (done) => {
    component.randomImgCount = 3;
    component.loadRandomImages(component.randomImgCount);
    component.imageList$.subscribe((images) => {
      expect(images.length).toBe(3);
      done();
    });
  });

  it('should properly get all images', (done) => {
    component.getAllImages();
    component.imageList$.subscribe((images) => {
      expect(images.length).toBe(1);
      done();
    });
  });
});
