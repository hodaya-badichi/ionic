import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { UserService } from '../servises/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

myform:FormGroup;
  constructor(public formBuilder:FormBuilder,private userService:UserService) { 
    this.myform=formBuilder.group({
      UserId:['',Validators.required],
      UserFirstName:['',Validators.required], 
      UserLastName:[''], 
      UserMail:['',Validators.email],
      UserPhone:['',Validators.required],
      UserPassword:['',Validators.required]
    });
  }
  onSubmit(form:FormGroup) {
    this.userService.register(form.value);  
   }

  ngOnInit() {
    
}

}
