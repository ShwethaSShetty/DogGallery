import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let fixture : ComponentFixture<AppComponent>;
  let component: AppComponent;
  let el: DebugElement;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj<Router>(Router.name, ['navigate']);
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatIconModule,
        BrowserAnimationsModule,
        AppComponent,
      ],
      providers: [{
        provide : Router,
        useValue: routerSpy
      }]
    }).compileComponents();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the Dog Gallery title`, () => {
    expect(component.title).toEqual('Dog Gallery');
  });

  it(`should call toggle side nav on click of menu button`,async() => {
    // Arrange
    const sideMenuButton = el.queryAll(By.css('.menu-icon'))[0];
    spyOn(component,'toggleSideNav');
    // Act
    sideMenuButton.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();
    // Assert
    expect(component.toggleSideNav).toHaveBeenCalled();
  });

  it(`should navigate to route on click of menu item`,async() => {
    const link = el.queryAll(By.css('a'))[1];
    spyOn(component,'closeSideNav');

    link.nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.closeSideNav).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/random-image']);
  });

});
