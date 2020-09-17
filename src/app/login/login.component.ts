import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { variable } from '@angular/compiler/src/output/output_ast';
import { UserService } from '../servises/user.service';
import { User } from '../class/user';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../app.component.scss'],
})
export class LoginComponent implements OnInit {
  public imagesFiles: File;
  name: string;
  password: string;
  user: User = null;
  myform: FormGroup;
  isDriver: boolean = false;
  constructor(public alertController: AlertController,public formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.myform = formBuilder.group({
      id: ['', Validators.required],
      password: ['', Validators.required],

    });

  }

  ngOnInit() {

  }
  // upload() {
  //   if()
  //   this.userService.uploadImage(this.imagesFiles,).subscribe(x => { });
  // }
  onSelectFile(event) {
    // called each time file input changes
    if (event.target.files && event.target.files[0]) {

      this.imagesFiles = event.target.files[0];

    }
  }
  Checked(): void {
    this.isDriver = !this.isDriver;
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'you are not exit',
      //subHeader: 'Subtitle',
      message: 'You must register as a new user',
      buttons: ['OK']
    });

    await alert.present();
  }
  async DontDriverAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'you are not driver',
      //subHeader: 'Subtitle',
      message: 'Add yourself as a driver or log in as a user',
      buttons: ['OK']
    });

    await alert.present();
  }
  onSubmit(form) {
    this.userService.Login(form.id, form.password).subscribe((user) => {
      if (!user) {
        this.presentAlert();
      }
      else {
        if(!user.IsDriver && this.isDriver)
        this.DontDriverAlert();
        ///localStorage user update
        else{
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isDriver", JSON.stringify(this.isDriver));
        this.router.navigateByUrl("/requests");
      }   
      }
    },
      (e) =>{this.presentAlert();}
    );


  }


}
