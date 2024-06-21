import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookMeetingPopupComponent } from './book-meeting-popup/book-meeting-popup.component';
import { CommonServiceService, MeetingRoom } from '../common-service.service';
import { Router } from '@angular/router';
import { MeetingDetailsTableComponent } from './meeting-details-table/meeting-details-table.component';
import { MatTableDataSource } from '@angular/material/table';

export interface MeetingDetails {

}
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{
   meetingRooms:any = [];
   getBookedMeetingRooms =new MatTableDataSource<MeetingRoom>();
   userName:any = '';
   @ViewChild(MeetingDetailsTableComponent) tableComponent = new MeetingDetailsTableComponent(this.commonService);
  constructor(public dialog: MatDialog, 
              private commonService:CommonServiceService,
              private router:Router) {}
   
  ngOnInit(): void {
    this.userName = this.commonService?.userName?this.commonService?.userName:sessionStorage?.getItem('username')?sessionStorage?.getItem('username'):'';
    this.commonService.getUpcomingMeetings().subscribe(data=>{
      this.commonService.upcomingMeetings = data;
      let meetingDetails = JSON.parse(JSON.stringify(data));
      this.commonService.userUpcomingMeetings = meetingDetails.filter((room:MeetingRoom)=>room.username == this.userName);
    });

    this.commonService.getMeetingRoomNames().subscribe((rooms:any[])=>{
     if(rooms && rooms?.length>0){
      rooms?.forEach((element:any) => {
        this.meetingRooms.push(element.name);
      });
    }
     
    })
  }

  getRoomNames(){
    return this.meetingRooms;
  }

  getUpcomingDataSource():MatTableDataSource<MeetingRoom>{
    let dataSource = new MatTableDataSource<MeetingRoom>();
    dataSource .data= this.commonService.userUpcomingMeetings
    return dataSource;
  }

  getRoomDetailsOnchange(event:any){
    this.getBookedMeetingRooms = this.commonService.getBookedMeetingRoomOnRoomName(event.value);
  }
 


  openDialog(): void {
    const dialogRef = this.dialog.open(BookMeetingPopupComponent, {
      data: this.meetingRooms,
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result){
      this.commonService.updateMeetingRooms(result);
     }
     
    });
  
  }

  logout(){
    this.router.navigateByUrl('\login');
  }

  deleteData(event:string){
    this.commonService.deleteData(event);
  }

  
}
