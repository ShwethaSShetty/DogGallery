import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByBreedComponent } from './by-breed.component';

describe('ByBreedComponent', () => {
  let component: ByBreedComponent;
  let fixture: ComponentFixture<ByBreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByBreedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ByBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
