import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  EMPTY,
  Observable,
  catchError,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { DogBreedServiceService } from '../../service/dog-breed.service';
import { CommonModule } from '@angular/common';
import { BreedSearchComponent } from '../../shared/component/breed-search/breed-search.component';
import { ActivatedRoute } from '@angular/router';
import { formatBreedList } from '../../shared/utils/breed-util';

@Component({
  selector: 'app-browse-breed-list',
  standalone: true,
  imports: [CommonModule, BreedSearchComponent],
  templateUrl: './browse-breed-list.component.html',
  styleUrl: './browse-breed-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseBreedListComponent {
  formattedDogBreedList$!: Observable<string[]>;
  dogImage$!: Observable<string | string[]>;
  selectedBreed!: string;

  private dogBreedService = inject(DogBreedServiceService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.formattedDogBreedList$ = this.route.queryParams.pipe(
      tap((params) => {
        this.selectedBreed = params['breed'];
      }),
      switchMap(() => this.dogBreedService.getBreedList()),
      map((breedList) => formatBreedList(breedList)),
      tap((formattedList) => {
        this.selectedBreed = this.selectedBreed || formattedList[0];
        this.getBreedImage();
      }),
      catchError(() => EMPTY)
    );
  }

  public getBreedImage(): void {
    const [breedName, subBreedName] = this.selectedBreed.split(' ').reverse();
    const partialUrl = breedName + (subBreedName ? '/' + subBreedName : '');
    this.dogImage$ = this.dogBreedService.getRandomDogImage(1, partialUrl).pipe(
      map((breedRes) => breedRes.message),
      catchError(() => EMPTY)
    );
  }

  public onBreedSelection(value: string): void {
    this.selectedBreed = value;
    this.getBreedImage();
  }
}
