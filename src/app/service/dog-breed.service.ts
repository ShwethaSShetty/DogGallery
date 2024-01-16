import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import {
  BreedsListResponse,
  MultipleImagesResponse,
  SingleImageResponse,
  SubBreedsListResponse,
} from '../shared/types/breed-types';

const BASE_URL = 'https://dog.ceo/api/';
const BREED_LIST_ALL_URL = `${BASE_URL}breeds/list/all`;
const BREED_URL = `${BASE_URL}breed/`;

@Injectable({
  providedIn: 'root',
})
export class DogBreedServiceService {
  private dogBreedListCache$: Observable<BreedsListResponse> | null = null;
  private dogSubBreedListCache$: {
    [key: string]: Observable<SubBreedsListResponse>;
  } = {};

  private http = inject(HttpClient);

  public getBreedList(): Observable<BreedsListResponse> {
    if (!this.dogBreedListCache$) {
      this.dogBreedListCache$ = this.http
        .get<BreedsListResponse>(`${BREED_LIST_ALL_URL}`)
        .pipe(shareReplay(1));
    }
    return this.dogBreedListCache$;
  }

  public getSubBreedList(breed: string): Observable<SubBreedsListResponse> {
    if (!this.dogSubBreedListCache$[breed]) {
      this.dogSubBreedListCache$[breed] = this.http
        .get<SubBreedsListResponse>(`${BREED_URL}${breed}/list`)
        .pipe(shareReplay(1));
    }

    return this.dogSubBreedListCache$[breed];
  }

  public getRandomDogImage(
    numberOfImages: number,
    partialUrl: string
  ): Observable<SingleImageResponse|MultipleImagesResponse> {
    const imageRequested = numberOfImages > 1 ? '/' + numberOfImages : '';
    const randomImagePartialUrl =
      partialUrl === 'breeds'
        ? `${partialUrl}/image/random`
        : `breed/${partialUrl}/images/random`;
    const randomImageUrl = `${BASE_URL}${randomImagePartialUrl}${imageRequested}`;
    return this.http.get<SingleImageResponse|MultipleImagesResponse>(randomImageUrl);
  }

  public getDogImagesByBreed(imageUrl: string): Observable<SingleImageResponse> {
    return this.http.get<SingleImageResponse>(`${BREED_URL}${imageUrl}/images`);
  }
}
