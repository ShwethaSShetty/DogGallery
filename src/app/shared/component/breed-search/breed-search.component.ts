import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EMPTY, Observable, catchError, debounceTime, distinctUntilChanged, map, of, startWith } from 'rxjs';

@Component({
  selector: 'breed-search',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './breed-search.component.html',
  styleUrl: './breed-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreedSearchComponent {
  breedSearchControl = new FormControl('');
  filteredOptions$!: Observable<string[]>;
  selectedMatOption: string = '';

  @Input() breedList: string[] = [];
  @Input() fieldTitle: string = 'Breed';

  private _preSelectedValue!: string;
  @Input()
  set preSelectedValue(value: string) {
    this._preSelectedValue = value;
    this.breedSearchControl.setValue(value);
  }

  get preSelectedValue(): string {
    return this._preSelectedValue;
  }

  @Output() selectedBreedEmitter = new EventEmitter<string>();

  ngOnInit() {
    this.filteredOptions$ = this.breedSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      distinctUntilChanged(),
      map(value => this._filter(value || '')),
      catchError(()=> EMPTY)
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredList = this.breedList.filter(option => option.toLowerCase().includes(filterValue));
    return filteredList;
  }

  public onOptionSelected(event: any): void {
    this.selectedBreedEmitter.emit(event.option?.value);
  }

  public trackByBreed = (index: number, breed: any) => breed;
}
