import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DriversService } from '../servises/drivers.service';
import { Driver } from '../driver';

@Component({
  selector: 'app-taxi',
  templateUrl: './taxi.page.html',
  styleUrls: ['./taxi.page.scss'],
})
export class TaxiPage implements OnInit {
  
  constructor(private driversService:DriversService) { }
  ngOnInit() {
  }
  // idDriver:number=null;
  // driver:Driver=null;
  // new:boolean=false;
  // exist:boolean=true;
  // newFunc(){
  //   this.new=true;
  //   this.exist=false;
  // }
  // existFunc(){
  //   this.new=false;
  //   this.exist=true;
  // }
  // isExist(){ 
  //   this.driver= this.driversService.isExist(this.idDriver);  
  //   return this.driver;

  // }
 
}
