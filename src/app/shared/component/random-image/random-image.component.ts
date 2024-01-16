import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { DogBreedServiceService } from '../../../service/dog-breed.service';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'random-image',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './random-image.component.html',
  styleUrl: './random-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RandomImageComponent implements OnInit, OnChanges {
  @Input() breed!: string;
  @Input() subBreed!: string;
  imageUrl: string = 'breeds';
  randomImgCount: number | undefined = 1;
  showError: boolean = false;
  imageList$!: Observable<string[]>;
  showAllImage!: boolean;

  private dogBreedService = inject(DogBreedServiceService);

  ngOnInit() {
    this.showAllImage = this.breed ? true : false;
    this.changeShowAllValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.imageUrl = '';
    if (this.breed) {
      this.imageUrl = this.breed;
    }
    if (this.subBreed) {
      this.imageUrl += '/' + this.subBreed;
    }
    this.changeShowAllValue();
  }

  public changeRandomImageDisplayCount(): void {
    if (
      this.randomImgCount == null ||
      this.randomImgCount < 1 ||
      this.randomImgCount > 50
    ) {
      this.showError = true;
      this.randomImgCount = undefined;
      return;
    }
    this.loadRandomImages(this.randomImgCount);
    this.showError = false;
  }

  public onImageDisplayTypeChange(event: MatRadioChange) : void{
    this.showAllImage = event.value == 'true';
    this.changeShowAllValue();
  }

  public trackByImageUrl = (index: number, imageUrl: any) => imageUrl;

  private changeShowAllValue(): void {
    if (this.showAllImage) {
      this.getAllImages();
    } else {
      this.loadRandomImages(this.randomImgCount);
    }
  }

  public loadRandomImages(imageCount: number = 1): void {
    this.imageList$ = this.dogBreedService
      .getRandomDogImage(imageCount, this.imageUrl)
      .pipe(
        map((res) =>
          Array.isArray(res?.message) ? res?.message : [res.message]
        ),
        catchError(()=> EMPTY)
      );
  }

  public getAllImages(): void {
    this.imageList$ = this.dogBreedService
      .getDogImagesByBreed(this.imageUrl)
      .pipe(
        map((res) =>
          Array.isArray(res?.message) ? res?.message :  [res.message]
        ),
        catchError(()=> EMPTY)
      );
  }
}
