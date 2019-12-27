import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeLibraryComponent } from './edge-library.component';

describe('EdgeLibraryComponent', () => {
  let component: EdgeLibraryComponent;
  let fixture: ComponentFixture<EdgeLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
