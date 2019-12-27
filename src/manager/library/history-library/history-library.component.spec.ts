import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryLibraryComponent } from './history-library.component';

describe('HistoryLibraryComponent', () => {
  let component: HistoryLibraryComponent;
  let fixture: ComponentFixture<HistoryLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
