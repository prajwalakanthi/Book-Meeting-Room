import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingDetailsTableComponent } from './meeting-details-table.component';

describe('MeetingDetailsTableComponent', () => {
  let component: MeetingDetailsTableComponent;
  let fixture: ComponentFixture<MeetingDetailsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetingDetailsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingDetailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
