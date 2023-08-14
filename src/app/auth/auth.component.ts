import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;


  constructor(private authService:AuthService) { }

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
authObs.subscribe({
  next: resData=>{
    console.log(resData);
    this.isLoading = false;
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

}
