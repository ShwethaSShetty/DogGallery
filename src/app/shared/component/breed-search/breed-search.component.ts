import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
})
export class BreedSearchComponent {
  breedSearchControl = new FormControl('');
  @Input() breedList: any = [];
  @Output() selectedBreedEmitter = new EventEmitter<string>();

  private _preSelectedValue!: string;

  @Input()
  set preSelectedValue(value: string) {
    this._preSelectedValue = value;
    this.breedSearchControl.setValue(value);
  }

  get preSelectedValue(): string {
    return this._preSelectedValue;
  }

  public onOptionSelected(event: any): void {
    this.selectedBreedEmitter.emit(event.option?.value);
  }

  public trackByBreed = (index: number, breed: any) => breed;
}
