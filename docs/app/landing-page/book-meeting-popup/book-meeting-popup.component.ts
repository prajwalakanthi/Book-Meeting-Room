import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MeetingRoom } from '../../common-service.service';

@Component({
  selector: 'app-book-meeting-popup',
  templateUrl: './book-meeting-popup.component.html',
  styleUrl: './book-meeting-popup.component.scss'
})
export class BookMeetingPopupComponent implements OnInit {
  formGroup!: FormGroup;
  userName: any = '';
  timeArray = ['09:00AM', '10:00AM', '11:00AM', '12:00PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00PM', '05:00PM', '06:00PM'];
  constructor(public dailog: MatDialogRef<BookMeetingPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: MeetingRoom[]) {

  }

  ngOnInit() {
    this.userName = sessionStorage.getItem('username');
    this.formGroup = new FormGroup({
      date: new FormControl(''),
      starttime: new FormControl('09:00 AM'),
      endtime: new FormControl('09:30 AM'),
      room: new FormControl(''),
      agenda: new FormControl('')
    })
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day >= new Date().getDay();
  };

  isRoomEnabled: boolean = false;
  enableRoom() {
    this.isRoomEnabled = !this.isRoomEnabled;
  }
  closeDailog() {
    this.dailog.close();
  }

  onFilterOptionSelected(event: any, timeStr: string) {
    if (timeStr === 'start') {
      this.formGroup.get('starttime')?.setValue(event.option.viewValue);
    }
    if (timeStr === 'end') {
      this.formGroup.get('endtime')?.setValue(event.option.viewValue);
    }

  }

  bookMeeting() {
    let data: MeetingRoom = {
      username: this.userName,
      date: this.converToDate(this.formGroup.get('date')?.value),
      time: this.formGroup.get('starttime')?.value + ':' + this.formGroup.get('endtime')?.value,
      room: this.formGroup.get('room')?.value,
      id: this.revisedRandId(),
      agenda: this.formGroup.get('agenda')?.value
    }
    this.dailog.close(data);
  }
  revisedRandId(): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substring(2, 10);
  }

  converToDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  validateTimeDifference(startTime: string, endTime: string): boolean {
    const start = this.parseTimeString(startTime);
    const end = this.parseTimeString(endTime);
    const differenceInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    return differenceInMinutes >= 30;
}
  parseTimeString(timeString: string): Date {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    // Convert to 24-hour format
    let hours24 = hours;
    if (period.toLowerCase() === 'pm' && hours24 !== 12) {
        hours24 += 12;
    } else if (period.toLowerCase() === 'am' && hours24 === 12) {
        hours24 = 0;
    }

    // Construct Date object with the time
    const date = new Date();
    date.setHours(hours24);
    date.setMinutes(minutes);
    
    return date;
}
}
