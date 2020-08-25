import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from '../servises/user.service';
import { User } from '../class/user';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss','../app.component.scss'],
})
export class RequestsPage implements OnInit {
  thisUser:User=null;
  constructor(private menu: MenuController,private userService:UserService) { }

  openMenu() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  closeMenu(){
    this.menu.close('first');
  }
  ngOnInit() {
    this.thisUser=JSON.parse(localStorage.getItem("user"));
  }
  isDriver(){
    return this.thisUser && this.thisUser.IsDriver;
  }

}