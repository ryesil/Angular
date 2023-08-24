import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  subscription: Subscription;
  //So angular will look for PlaceHolderDirective in the html. it will find the first occurence
@ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
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
    this.showErrorAlert(err.message);
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


//Here we dynamically make component inside another component
//This will be called whenever there is an error
private showErrorAlert(message:string){
const hostViewContainerRef = this.alertHost.viewContainerRef;
//this is an object. we need to clear all the angular stuff thar are rendered in it.
hostViewContainerRef.clear();
const alertCmp = hostViewContainerRef.createComponent(AlertComponent);
const alertCmpInstance = alertCmp.instance;
      alertCmpInstance.message = message;
     this.subscription = alertCmpInstance.close.subscribe(()=>{
        this.subscription.unsubscribe();
        hostViewContainerRef.clear();
      })
}


//In case we remove the authcomponent after login we dont want to end the subscription as well.
ngOnDestroy(): void {
 if(this.subscription){
  this.subscription.unsubscribe();
 }
}

}
