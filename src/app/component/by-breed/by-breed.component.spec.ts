
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ByBreedComponent } from './by-breed.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DogBreedServiceService } from '../../service/dog-breed.service';

describe('ByBreedComponent', () => {
  let component: ByBreedComponent;
  let fixture: ComponentFixture<ByBreedComponent>;
  let mockDogBreedServiceService: jasmine.SpyObj<DogBreedServiceService>;

  beforeEach(async () => {
    mockDogBreedServiceService = jasmine.createSpyObj<DogBreedServiceService>(DogBreedServiceService.name, ['getBreedList','getRandomDogImage','getDogImagesByBreed']);

    await TestBed.configureTestingModule({
      imports:[ByBreedComponent,NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DogBreedServiceService, useValue: mockDogBreedServiceService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ByBreedComponent);
    component = fixture.componentInstance;

    mockDogBreedServiceService.getBreedList.and.returnValue(of({
      'message': {  'appenzeller': [], 'australian': ['shepherd']},
      'status': 'success'
    }));

    mockDogBreedServiceService.getRandomDogImage.and.returnValue(of({
      status: 'success',
      message: [
         "https://images.dog.ceo/breeds/setter-english/n02100735_6707.jpg",
      ]
    }));

    mockDogBreedServiceService.getDogImagesByBreed.and.returnValue(of({
      status: 'success',
      message:"https://images.dog.ceo/breeds/setter-english/n02100735_6707.jpg",
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get breed list on init', () => {
    expect(mockDogBreedServiceService.getBreedList).toHaveBeenCalledTimes(1);
  });

  it('should get breed list on breed selection', () => {
    component.onBreedSelection('bulldog');
    expect(mockDogBreedServiceService.getBreedList).toHaveBeenCalledTimes(2);
  });

});
