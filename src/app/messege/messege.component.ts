import { Component, OnInit } from '@angular/core';
import { MessegeService } from '../servises/messege.service';
import { Messege } from '../class/messege';
import { User } from '../class/user';
import { Travels } from '../class/travels';
import { TravelsService } from '../servises/travels.service';
import { element } from 'protractor';
import { UserService } from '../servises/user.service';
import { Router } from '@angular/router';
import { RequestService } from '../servises/request.service';
import { emit } from 'process';

@Component({
  selector: 'app-messege',
  templateUrl: './messege.component.html',
  styleUrls: ['./messege.component.scss', '../app.component.scss'],
})
export class MessegeComponent implements OnInit {
  messegeArr: Messege[];
  travelsArr: any[] = null;
  userArr: User[];
  thisUser: User;
  isDriver: boolean;
  constructor(private router: Router, private messegeService: MessegeService, private travelSrevice: TravelsService,
    private userService: UserService, private requestService: RequestService) { }

  ngOnInit() {
    this.thisUser = JSON.parse(localStorage.getItem("user"));
    this.isDriver = JSON.parse(localStorage.getItem("isDriver"));
    this.Refresh();
  }
  Refresh() {

    this.userService.getUsers().subscribe(
      (userArr) => {
        this.userArr = userArr;
      }
    )
    this.messegeService.getMessegeArrByUserId(this.thisUser.UserId).subscribe(
      (messegeArr) => {
        this.messegeArr = messegeArr;

        console.log(messegeArr);
        if (!this.isDriver) {
          this.travelSrevice.getTravelsArr().subscribe(
            (travelArr) => {
              this.travelsArr = travelArr.filter(element => messegeArr.find(
                em => (Number)(em.TravelCode.split("-", 2)[0]) == element.TravleCode ) != null);
            }
          );
        }
        else {
          this.requestService.getRequests().subscribe(
            (requestArr) => {
              this.travelsArr = requestArr.filter(element => messegeArr.find(
                em => (Number)(em.TravelCode.split("-", 2)[1]) == element.RequestCode) != null);
            }
          )
        }
      }
    );
  }
  getSourceAddress(travelCode: string) {
    if (!this.isDriver)
      return this.travelsArr.find(element => element.TravleCode + "" == travelCode.split("-", 2)[0]).SourceAddress;
    return this.travelsArr.find(element => element.RequestCode + "" == travelCode.split("-", 2)[1]).SourceAddress;
  }
  getDestinationAddress(travelCode: string) {
    if (!this.isDriver)
      return this.travelsArr.find(element => element.TravleCode + "" == travelCode.split("-", 2)[0]).DestinationAddress;
    return this.travelsArr.find(element => element.RequestCode + "" == travelCode.split("-", 2)[1]).DestinationAddress;
  }
  getPrice(travelCode: string) {

    return this.travelsArr.find(element => element.TravleCode + "" == travelCode.split("-", 2)[0]).Price;
  }
  getDate(travelCode: string) {

    return this.travelsArr.find(element => element.TravleCode + "" == travelCode.split("-", 2)[0]).Date;
  }
  getDriverName(travelCode: string) {
    let user: User = this.userArr.find(element => element.UserId == this.getDriverId(travelCode));
    return user.UserFirstName + " " + user.UserLastName;
  }
  getDriverId(travelCode: string) {

    return this.travelsArr.find(element => element.TravleCode + "" == travelCode.split("-", 2)[0]).UserId;
  }
  Ok(item: Messege) {
    ///עדכון קוד הנסיעה
    let travelCode = item.TravelCode;
    console.log((Number)(travelCode.split("-", 2)[1]), (Number)(travelCode.split("-", 2)[0]));
    this.requestService.UpdateRequest((Number)(travelCode.split("-", 2)[1]), (Number)(travelCode.split("-", 2)[0]));
    this.Cancel(item);
  }
  Cancel(item: Messege) {
    
    this.messegeService.delMessege(item.MessegeCode).subscribe(
      (res) => { console.log(res); }
    );
   
    this.Refresh();
  }
  GO() {
    this.router.navigateByUrl("/requests");
  }
}
