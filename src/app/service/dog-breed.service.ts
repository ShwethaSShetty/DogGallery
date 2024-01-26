import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, shareReplay, tap } from 'rxjs';
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
  private dogSubBreedListCache = new Map<string,SubBreedsListResponse>();

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
    let subBreedResponse : Observable<SubBreedsListResponse>;
    if (this.dogSubBreedListCache.has(breed)) {
       subBreedResponse = of(this.dogSubBreedListCache.get(breed)!);
    }else{
      subBreedResponse = this.http
      .get<SubBreedsListResponse>(`${BREED_URL}${breed}/list`)
      .pipe(tap(response=> this.dogSubBreedListCache.set(breed,response)),
      shareReplay(1))
    }

    return subBreedResponse;
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
