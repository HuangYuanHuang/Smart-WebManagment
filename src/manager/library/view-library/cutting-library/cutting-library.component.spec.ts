import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuttingLibraryComponent } from './cutting-library.component';

describe('CuttingLibraryComponent', () => {
  let component: CuttingLibraryComponent;
  let fixture: ComponentFixture<CuttingLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuttingLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuttingLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
