
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject } from 'rxjs';
import { BrowseBreedListComponent } from './browse-breed-list.component';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DogBreedServiceService } from '../../service/dog-breed.service';

describe('BrowseBreedListComponent', () => {
  let component: BrowseBreedListComponent;
  let fixture: ComponentFixture<BrowseBreedListComponent>;
  let mockDogBreedServiceService: jasmine.SpyObj<DogBreedServiceService>;
  let mockActivatedRouteService;

  beforeEach(async () => {
    mockDogBreedServiceService = jasmine.createSpyObj<DogBreedServiceService>(DogBreedServiceService.name, ['getBreedList', 'getRandomDogImage']);
    mockActivatedRouteService = {
      queryParams: new BehaviorSubject<any>({})
    };

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule,BrowseBreedListComponent ,NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DogBreedServiceService, useValue: mockDogBreedServiceService },
        { provide: ActivatedRoute, useValue: mockActivatedRouteService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseBreedListComponent);
    component = fixture.componentInstance;
    mockDogBreedServiceService.getBreedList.and.returnValue(of({status: 'success', message: {"akita": []}}));
    mockDogBreedServiceService.getRandomDogImage.and.returnValue(of({status: 'success', message: 'https://images.dog.ceo/breeds/akita/akita1.jpg'}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get breed list on init', () => {
    expect(mockDogBreedServiceService.getBreedList).toHaveBeenCalled();
  });

  it('should get breed image on breed selection', () => {
    component.onBreedSelection('akita');
    expect(mockDogBreedServiceService.getRandomDogImage).toHaveBeenCalled();
  });

});
