import { Component, OnInit, inject } from '@angular/core';
import { DogBreedServiceService } from '../../service/dog-breed.service.ts.service';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { formatBreedList } from '../../shared/utils/breed-util';

@Component({
  selector: 'breed-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './breed-list.component.html',
  styleUrl: './breed-list.component.scss',
})
export class BreedListComponent implements OnInit {
  formattedBreedList$!: Observable<string[]>;

  private dogBreedService = inject(DogBreedServiceService);

  ngOnInit() {
    this.formattedBreedList$ = this.dogBreedService
      .getBreedList()
      .pipe(map((breedList) => formatBreedList(breedList)));
  }

  public trackByBreed = (index: number, breed: any) => breed;
}
