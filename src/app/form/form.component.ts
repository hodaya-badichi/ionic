import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, AbstractControl, FormBuilder, Form } from '@angular/forms';
import { DriversService } from '../servises/drivers.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  myform:FormGroup;
  yes:boolean=false;
  constructor(public formBuilder:FormBuilder,private driversService:DriversService) { 
    this.myform=formBuilder.group({
      name:['',Validators.required],      
      email:['',Validators.email],
      phone:['']
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
