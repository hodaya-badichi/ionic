import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { UserService } from '../servises/user.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from '../class/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss','../app.component.scss'],
})
export class RegistrationComponent implements OnInit {

myform:FormGroup;
isDriver:boolean=false;
  constructor(public formBuilder:FormBuilder,private userService:UserService,private router: Router) { 
    this.myform=formBuilder.group({
      UserId:['',Validators.required],
      UserFirstName:['',Validators.required], 
      UserLastName:[''], 
      UserMail:['',Validators.email],
      UserPhone:['',Validators.required],
      UserPassword:['',Validators.required],
     
    });
  }
  onSubmit(form:FormGroup) {
    let user:User=new User(form.value.UserId,form.value.UserFirstName,form.value.UserLastName
      ,form.value.UserMail,form.value.UserPassword,form.value.UserPhone,this.isDriver);
     this.userService.register(user);
     localStorage.setItem("user", JSON.stringify(user));
     this.router.navigateByUrl("/requests");
   }
   Checked(): void {
    this.isDriver = !this.isDriver;
  }
  ngOnInit() {
    
}

}
