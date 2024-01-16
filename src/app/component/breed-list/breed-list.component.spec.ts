import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BreedListComponent } from './breed-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DogBreedServiceService } from '../../service/dog-breed.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('BreedListComponent', () => {
  let component: BreedListComponent;
  let fixture: ComponentFixture<BreedListComponent>;
  let mockDogBreedServiceService: jasmine.SpyObj<DogBreedServiceService>;

  beforeEach(async () => {
    mockDogBreedServiceService = jasmine.createSpyObj<DogBreedServiceService>(DogBreedServiceService.name, ["getBreedList"]);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BreedListComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: DogBreedServiceService, useValue: mockDogBreedServiceService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedListComponent);
    component = fixture.componentInstance;

    mockDogBreedServiceService.getBreedList.and.returnValue(of({
      'message': { 'appenzeller': [], 'australian': ['shepherd'] },
      'status': 'success'
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get breed list on init', () => {
    expect(mockDogBreedServiceService.getBreedList).toHaveBeenCalled();
  });

  it('should filter breed list on input change', () => {
    const inputElement = fixture.debugElement.nativeElement.querySelector('input');
    inputElement.value = 'australian';
    inputElement.dispatchEvent(new Event('input'));

    component.formattedBreedList$.subscribe(filteredBreedList => {
      expect(filteredBreedList).toEqual(['shepherd australian']);
    });
  });
});
