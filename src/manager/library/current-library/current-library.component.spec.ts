import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLibraryComponent } from './current-library.component';

describe('CurrentLibraryComponent', () => {
  let component: CurrentLibraryComponent;
  let fixture: ComponentFixture<CurrentLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
