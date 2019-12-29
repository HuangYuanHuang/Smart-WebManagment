import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLibraryComponent } from './import-library.component';

describe('ImportLibraryComponent', () => {
  let component: ImportLibraryComponent;
  let fixture: ComponentFixture<ImportLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
