import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DriversService } from '../servises/drivers.service';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {

myform:FormGroup;
  yes:boolean=false;
  constructor(public formBuilder:FormBuilder,private driversService:DriversService) { 
    this.myform=formBuilder.group({
      id:['',Validators.required],
      firstName:['',Validators.required], 
      lastName:['',Validators.required], 
      email:['',Validators.email],
      password:['',Validators.required]
    });
  }
  onSubmit(form) {
  //services.savanewdriver(form.value)
  //
 
  this.driversService.register(form);  
   }

  ngOnInit() {
    
}

}
