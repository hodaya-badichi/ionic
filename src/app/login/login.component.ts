import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DriversService } from '../servises/drivers.service';
import { Driver } from '../driver';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
name:string;
password:string;
driver:Driver=null;
myform:FormGroup;

  constructor(public formBuilder:FormBuilder,private driversService:DriversService) { 
    this.myform=formBuilder.group({
      id:['',Validators.required],
      password:['',Validators.required]
    });
  }

  ngOnInit() {
 
  }
  onSubmit(form){
   
 this.driversService.getDriverById(form.id,form.password).subscribe(res=>{
   this.driver=res,
  
   (err)=>console.log("errrrrrrrr :(");
  console.log(this.driver);
  })


}
 
}
