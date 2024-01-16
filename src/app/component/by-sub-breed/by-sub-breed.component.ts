import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RandomImageComponent } from '../../shared/component/random-image/random-image.component';
import {
  EMPTY,
  Observable,
  catchError,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { DogBreedServiceService } from '../../service/dog-breed.service';
import { CommonModule } from '@angular/common';
import { BreedSearchComponent } from '../../shared/component/breed-search/breed-search.component';

@Component({
  selector: 'by-sub-breed',
  standalone: true,
  imports: [RandomImageComponent, CommonModule, BreedSearchComponent],
  templateUrl: './by-sub-breed.component.html',
  styleUrl: './by-sub-breed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BySubBreedComponent implements OnInit {
  breedName!: string;
  subBreedName!: string;
  subBreedFieldTitle: string = 'Sub Breed';
  subBreedList$!: Observable<string[]>;
  breedList: string[] = [];

  private dogBreedService = inject(DogBreedServiceService);

  ngOnInit() {
    this.getBreedList();
  }

  private getBreedList(): void {
    this.subBreedList$ = this.dogBreedService.getBreedList().pipe(
      map((breedListRes) => {
        return Object.keys(breedListRes.message).filter(
          (key) =>
            Array.isArray(breedListRes.message[key]) &&
            breedListRes.message[key].length != 0
        );
      }),
      tap((breedList) => {
        this.breedList = breedList;
        this.breedName = this.breedName || breedList[0];
      }),
      switchMap(() => this.getSubBreedList()),
      catchError(() => EMPTY)
    );
  }

  private getSubBreedList(): Observable<string[]> {
    return this.dogBreedService.getSubBreedList(this.breedName).pipe(
      map((subBreedList) => {
        this.subBreedName = subBreedList.message[0];
        return subBreedList.message;
      }),
      catchError(() => EMPTY)
    );
  }

  public onBreedSelection(value: string): void {
    this.breedName = value;
    this.subBreedList$ = this.getSubBreedList();
  }

  public onSubBreedSelection(value: string): void {
    this.subBreedName = value;
  }
}
