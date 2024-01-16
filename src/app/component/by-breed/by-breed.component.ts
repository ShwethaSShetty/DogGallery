import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RandomImageComponent } from '../../shared/component/random-image/random-image.component';
import { EMPTY, Observable, catchError, map, tap } from 'rxjs';
import { DogBreedServiceService } from '../../service/dog-breed.service';
import { BreedSearchComponent } from '../../shared/component/breed-search/breed-search.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'by-breed',
  standalone: true,
  imports: [
    RandomImageComponent,
    BreedSearchComponent,
    CommonModule,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './by-breed.component.html',
  styleUrl: './by-breed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ByBreedComponent {
  selectedBreedName!: string;
  breedList$!: Observable<string[]>;

  private dogBreedService = inject(DogBreedServiceService);

  ngOnInit() {
    this.getBreedList();
  }

  public onBreedSelection(value: string):void {
    this.selectedBreedName = value;
    this.getBreedList();
  }

  public getBreedList(): void{
    this.breedList$ = this.dogBreedService.getBreedList().pipe(
      map((breedListResp) =>  Object.keys(breedListResp.message)),
      tap((breedList)=> this.selectedBreedName = this.selectedBreedName || breedList[0] ),
      catchError(()=>EMPTY)
    );
  }


}
