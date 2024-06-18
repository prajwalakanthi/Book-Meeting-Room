
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Timestamp } from 'rxjs';

 export interface MeetingRoom{
  username:string,
  agenda:string,
  date:string,
  time:string,
  room:string,
  id?:string
 }

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
   upcomingMeetings:MeetingRoom[] = [];
   userName:string = '';
   userUpcomingMeetings:MeetingRoom[] = [];
  constructor(private http:HttpClient) { }

  getUpcomingMeetings(): Observable<any>{    
     return this.http.get("assets/bookedmeetingrooms.json");
  }

  getMeetingRoomNames():Observable<any> {
    return this.http.get("assets/meetingrooms.json");
  }

  getBookedMeetingRoomOnRoomName(name:string){
    if(this.upcomingMeetings && this.upcomingMeetings?.length>0){
    let rooms:any = [] = JSON.parse(JSON.stringify(this.upcomingMeetings));
    rooms = rooms?.filter((value:any)=>value.room == name);
    return rooms;
    } else {
      return [];
    }
  }

  updateMeetingRooms(data:MeetingRoom){
    this.upcomingMeetings.push(data);
    this.userUpcomingMeetings.push(data);
    this.http.put('assets/bookedmeetingrooms.json',data);
  }

  getUserDetails(){
    return this.http.get("assets/userdetails.json");
  }

  deleteData(id: string):MeetingRoom[]{
    const idx = this.userUpcomingMeetings?.findIndex((data:any)=>data.id== id);
    const allIdx = this.upcomingMeetings?.findIndex((data:any)=>data.id== id);
    if(idx>=0){  
      this.userUpcomingMeetings.splice(idx,1);
    }
    if(allIdx>=0){
      this.upcomingMeetings.splice(allIdx,1);
    }
    return this.userUpcomingMeetings;
  }
}
