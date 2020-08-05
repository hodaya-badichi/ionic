import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RequestService } from '../servises/request.service';
import { UserService } from '../servises/user.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss'],
})
export class AddRequestComponent implements OnInit {

  myform:FormGroup;
  constructor(public formBuilder:FormBuilder,private requestService:RequestService,private userService:UserService) { 
    this.myform=formBuilder.group({
      RequestCode:[''],
      UserId:[''],
      SourceAddress:['',Validators.required],
      DestinationAddress:['',Validators.required], 
      Date:['',Validators.required], 
      Frequency:['',Validators.required],
      Summarry:[''],
     
    });
  }
  onSubmit(form:FormGroup) {
    form.value.RequestCode=this.requestService.getId();
    form.value.UserId=this.userService.getThisUser().UserId;
    this.requestService.AddRequest(form.value);  
  }

  ngOnInit() {}

}
