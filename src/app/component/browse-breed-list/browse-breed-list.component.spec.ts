import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseBreedListComponent } from './browse-breed-list.component';

describe('BrowseBreedListComponent', () => {
  let component: BrowseBreedListComponent;
  let fixture: ComponentFixture<BrowseBreedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseBreedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseBreedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
