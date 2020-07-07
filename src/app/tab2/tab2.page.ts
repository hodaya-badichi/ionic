// import { Component } from '@angular/core';
// import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


// @Component({
//   selector: 'app-tab2',
//   templateUrl: 'tab2.page.html',
//   styleUrls: ['tab2.page.scss']
// })
// export class Tab2Page {

//   myForm:FormGroup;
// name:AbstractControl;
// email:AbstractControl;
// phone:AbstractControl;

//   constructor(public formBuilder:FormBuilder) { 
//     this.myForm=formBuilder.group({
//       name:['',Validators.required],      
//       email:[''],
//       phone:['']
//     });
//     this.name=this.myForm.controls['name'];
//     this.email=this.myForm.controls['email'];
//     this.phone=this.myForm.controls['phone'];


//   }

// }
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

constructor(private menu: MenuController) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
    
  }
  closeCustom(){
    this.menu.close('custom');
  }
 


}
