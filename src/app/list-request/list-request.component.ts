import { Component, OnInit } from '@angular/core';
import { Request } from '../class/request';
import { RequestService } from '../servises/request.service';
import { request } from 'http';
import { MenuController } from '@ionic/angular';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss', '../app.component.scss'],
})
export class ListRequestComponent implements OnInit {
  requestsArr: Request[];
  constructor(private requestService: RequestService, public menu: MenuController) { }
  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  closeMenu() {
    this.menu.close('first');
  }
  ngOnInit() {

 this.requestService.getRequests()
    .subscribe(
      (request)=>{
       this.requestsArr=request;
        this.requestsArr.filter(element=>element.TravelCode==null);
      },
      (e) => 
      {
        alert('No Request found!');
       
      }
    );
  }
  rCode: number = null;

  f(rCode) {
    this.rCode = this.rCode != rCode ? rCode : null;

  }
}
