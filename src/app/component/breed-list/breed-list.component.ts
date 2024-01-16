import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DogBreedServiceService } from '../../service/dog-breed.service';
import { EMPTY, Observable, catchError, from, map, of, tap } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreedListComponent implements OnInit {
  formattedBreedList$!: Observable<string[]>;
  allBreeds!: string[];

  private dogBreedService = inject(DogBreedServiceService);

  ngOnInit() {
    this.formattedBreedList$ = this.dogBreedService
      .getBreedList()
      .pipe(map((breedListRes) => formatBreedList(breedListRes)),
      tap((breedList)=> this.allBreeds = breedList),
      catchError((err)=> EMPTY));
  }
  public filterBreeds(event:any): void {
    const filterValue = event.target.value;
    this.formattedBreedList$ = of(this.allBreeds.filter(breed => breed.toLowerCase().includes(filterValue)));
  }

  public trackByBreed = (index: number, breed: any) => breed;
}
