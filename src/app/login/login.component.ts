import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { UserService } from '../servises/user.service';
import { User } from '../class/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../app.component.scss'],
})
export class LoginComponent implements OnInit {
  name: string;
  password: string;
  user: User = null;
  myform: FormGroup;
  isDriver: boolean = false;
  constructor(public formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.myform = formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],

    });

  }

  ngOnInit() {

  }
  Checked(): void {
    this.isDriver = !this.isDriver;
  }
  onSubmit(form) {
    this.userService.Login(form.id, form.password, this.isDriver).subscribe((user) => {
      if (!user) alert('No user found!');
      else {

        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigateByUrl("/requests");
        
      }
    },
      (e) => (alert('No user found!')));

    //.subscribe(res=>{
    //    this.user=res,
    //    (err)=>console.log("errrrrrrrr :(");
    // console.log(this.user);
    //})


  }


}
