import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiercingLibraryComponent } from './piercing-library.component';

describe('PiercingLibraryComponent', () => {
  let component: PiercingLibraryComponent;
  let fixture: ComponentFixture<PiercingLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiercingLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiercingLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
