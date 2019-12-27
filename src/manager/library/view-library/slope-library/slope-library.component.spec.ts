import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlopeLibraryComponent } from './slope-library.component';

describe('SlopeLibraryComponent', () => {
  let component: SlopeLibraryComponent;
  let fixture: ComponentFixture<SlopeLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlopeLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlopeLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
