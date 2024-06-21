import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonServiceService, MeetingRoom } from '../../common-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-meeting-details-table',
  templateUrl: './meeting-details-table.component.html',
  styleUrl: './meeting-details-table.component.scss'
})
export class MeetingDetailsTableComponent implements OnInit {
  
  @Input() dataSource = new MatTableDataSource<MeetingRoom>();
  @Input() deletEnabled:boolean = false;
  @Output() emitId = new EventEmitter();
  displayedColumns: string[] = ['srno', 'username', 'agenda', 'date', 'time', 'room','delete'];

  constructor(private commonService:CommonServiceService){

  }

  ngOnInit(): void {
   
  }

  deleteData(id:string){  
   this.emitId.emit(id);
  }
}
