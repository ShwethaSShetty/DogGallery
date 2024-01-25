import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { DogBreedServiceService } from '../../service/dog-breed.service';
import {
  EMPTY,
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { formatBreedList } from '../../shared/utils/breed-util';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'breed-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatInputModule, MatFormFieldModule],
  templateUrl: './breed-list.component.html',
  styleUrl: './breed-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreedListComponent implements OnInit, AfterViewInit {
  formattedBreedList$: Observable<string[]> = new Observable<string[]>();
  allBreeds!: string[];

  private dogBreedService = inject(DogBreedServiceService);

  @ViewChild('input', { static: false }) input!: ElementRef;

  ngOnInit() {
    this.formattedBreedList$ = this.dogBreedService.getBreedList().pipe(
      map((breedListRes) => formatBreedList(breedListRes)),
      tap((breedList) => (this.allBreeds = breedList)),
      catchError(() => EMPTY)
    );
  }

  ngAfterViewInit() {
    this.formattedBreedList$ = fromEvent(this.input.nativeElement, 'input').pipe(
      debounceTime(150),
      distinctUntilChanged(),
      startWith(''),
      map(()=> this.input.nativeElement.value),
      switchMap((value) =>of(
          this.allBreeds.filter((breed) =>
            breed.toLowerCase().includes(value)
          )
        )
      ),catchError(() => EMPTY)
    );
  }

  public trackByBreed = (index: number, breed: any) => breed;
}
