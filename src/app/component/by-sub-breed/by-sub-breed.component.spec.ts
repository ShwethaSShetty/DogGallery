import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BySubBreedComponent } from './by-sub-breed.component';

describe('BySubBreedComponent', () => {
  let component: BySubBreedComponent;
  let fixture: ComponentFixture<BySubBreedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BySubBreedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BySubBreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
