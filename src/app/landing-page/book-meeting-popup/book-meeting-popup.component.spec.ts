import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMeetingPopupComponent } from './book-meeting-popup.component';

describe('BookMeetingPopupComponent', () => {
  let component: BookMeetingPopupComponent;
  let fixture: ComponentFixture<BookMeetingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookMeetingPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookMeetingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
