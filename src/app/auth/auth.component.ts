import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm){
    if(!authForm.valid){
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    let authObs:Observable<AuthResponseData>;
this.isLoading = true;
if(this.isLoginMode){
  //Login
  authObs =  this.authService.login(email,password);
  this.isLoading = false;
} else {
  //Signup
  authObs = this.authService.signup(email, password);
}
//authObs = this.isLoginMode ? this.authService.login(email,password) : this.authService.signup(email, password);
authObs.subscribe({
  next: resData=>{
    //we know that we are authenticated but server doesn't know
    console.log(resData);
    this.isLoading = false;
    //when login is successful then we nevigate to recipes
    //we want to navigate if user clicks the button and login is successful
    //this route is comming from app-routing.module.ts
    this.router.navigate(['/recipes'])
  },
  error: err=>{
   
    this.error = err.message;
    this.isLoading = false;
  },
  complete: ()=> {
    console.log(this.isLoading)
  }  
});
    authForm.reset();
  }

  onHandleError(){
  this.error = null;
}

}
