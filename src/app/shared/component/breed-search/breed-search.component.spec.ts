import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BreedSearchComponent } from './breed-search.component';
import { By } from '@angular/platform-browser';
import { take } from 'rxjs';

describe('BreedSearchComponent', () => {
  let component: BreedSearchComponent;
  let fixture: ComponentFixture<BreedSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        BreedSearchComponent
      ]
     })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedSearchComponent);
    component = fixture.componentInstance;
    component.breedList = ['affenpinscher', 'african', 'airedale'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set pre-selected value', () => {
    const controlValue = 'affenpinscher';
    component.preSelectedValue = controlValue;
    expect(component.breedSearchControl.value).toBe(controlValue);
  });

  it('should emit selected breed on option selected', () => {
    spyOn(component.selectedBreedEmitter, 'emit');
    const breedOption = 'affenpinscher';
    component.onOptionSelected({
      option: {
        value: breedOption
      }
    });
    expect(component.selectedBreedEmitter.emit).toHaveBeenCalledWith(breedOption);
  });

  it('should trigger value changes and filter the list', async() => {
    const inputElement = fixture.debugElement.nativeElement.querySelector('input');
    inputElement.value = 'african';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    component.filteredOptions$.subscribe(option=>
      expect(option.length).toBe(1)
    );
    expect(component.breedSearchControl.value).toBe('african');
  });



  it('should track breed by reference', () => {
    const breed = { name: 'affenpinscher' };
    expect(component.trackByBreed(0, breed)).toBe(breed);
  });
});
