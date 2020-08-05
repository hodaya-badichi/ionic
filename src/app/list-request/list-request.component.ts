import { Component, OnInit } from '@angular/core';
import { Request } from '../class/request';
import { RequestService } from '../servises/request.service';
import { request } from 'http';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss'],
})
export class ListRequestComponent implements OnInit {
  requests:Request[];
  constructor(private requestService:RequestService) { }

  ngOnInit() {
   
   this.requests=this.requestService.getRequests();
  }

}
