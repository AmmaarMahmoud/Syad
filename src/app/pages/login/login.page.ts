import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myForm!:FormGroup

  constructor(
    private build : FormBuilder,
    private NavCtr: NavController
  ) { }

  ngOnInit() {
    this.CreateForm()
  }

  CreateForm(){
    this.myForm=this.build.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }
  get username(){
    return this.myForm.get('username')
  }
  get password(){
    return this.myForm.get('password')
  }
  Onsubmite(){
    console.log(this.myForm.value);
    localStorage.setItem('token','token')
    this.NavCtr.navigateForward('/home')
  }
}
