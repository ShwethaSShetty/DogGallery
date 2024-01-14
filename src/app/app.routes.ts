import { Routes } from '@angular/router';
import { BreedListComponent } from './component/breed-list/breed-list.component';
import { RandomImageComponent } from './shared/component/random-image/random-image.component';
import { ByBreedComponent } from './component/by-breed/by-breed.component';
import { BySubBreedComponent } from './component/by-sub-breed/by-sub-breed.component';
import { BrowseBreedListComponent } from './component/browse-breed-list/browse-breed-list.component';

export const routes: Routes = [
  { path: 'list', component: BreedListComponent },
  { path: 'random-image', loadComponent: ()=> import('./shared/component/random-image/random-image.component').then(mod=>mod.RandomImageComponent) },
  { path: 'by-breed', loadComponent: () => import('./component/by-breed/by-breed.component').then(mod=>mod.ByBreedComponent) },
  { path: 'by-subBreed',loadComponent:()=>import('./component/by-sub-breed/by-sub-breed.component').then(mod=>mod.BySubBreedComponent) },
  { path: 'browse-breed', loadComponent:()=>import('./component/browse-breed-list/browse-breed-list.component').then(mod=>mod.BrowseBreedListComponent)},
  { path: '', pathMatch: 'full', redirectTo: 'list' },
];
