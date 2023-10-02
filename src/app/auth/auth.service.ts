import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import * as moment  from 'moment';
import { Router } from '@angular/router';

//There are multiple ways to implement the token logic. We will use BehaviorSubject. That allows us to fetch data of the user
// who is currently active 
export interface AuthResponseData{
kind:string;
idToken: string;
email: string;
refreshToken: string;
expiresIn: string;
localId: string;
//Optional. B/c signUp doesn't but login yields it.
registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
//subject is generic
//This subject is old way. In order to implement token logic we used BehaviorSubject
  // user = new Subject<User>();
  //token = null;
  //This user will be set to null after refreshing the page
  //We need to save the token somewhere else
  //we can store to cookies or localStorage
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http:HttpClient, private router: Router) { }


signup(email:string, password:string){
return this.http
  .post<AuthResponseData>(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUp65QqGUF3k2d-uzMWdf117qoSS2WEaw',
    {
      email: email,
      password: password,
      returnSecureToken: true,
    }
  )
  .pipe(
    catchError(this.handleError),
    tap((resData) => {
      this.handleAuthetication(resData.email,resData.localId,resData.idToken, +resData.expiresIn);
    })
  );
}



login(email:string, password:string){
return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUp65QqGUF3k2d-uzMWdf117qoSS2WEaw',{
  email:email,
  password:password,
  returnSecureToken:true
}).pipe(catchError(this.handleError),

tap((resData) => {
  this.handleAuthetication(resData.email,resData.localId,resData.idToken, +resData.expiresIn);
})
);
}


//this is the sate before we logged in. A null user.
logout(){
this.user.next(null);
this.router.navigate(['./auth'])
localStorage.removeItem('userData');

//if timer exists we clear it.
if(this.tokenExpirationTimer){
  clearTimeout(this.tokenExpirationTimer);
}
}

//we need this to implement login out after 1 hr.
//we need to call autoLogout whenever a new user emits ( handleAutentication and autoLogin)
autoLogout(experiationDuration:number){
  console.log(experiationDuration);
  //If the user logs out before the timer. Then we need to clear the timer.
this.tokenExpirationTimer = setTimeout(()=>{
  this.logout();
}, experiationDuration);
}
private handleAuthetication(email:string, userID: string, token: string, expiresIn: number){
  //TODO use moment.js later in this area.
  const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(
    email,
    userID,
    token,
    expirationDate
  );
  //Now, we can use the subject to next that user, so to set this or emit this
  //Emit is like broadcasting user to its subscribers.
  //b/c user is an observable, we need to emit the new user.
  this.user.next(user);
  //after user is emitted we start the autoLogout.
  this.autoLogout(expiresIn * 1000);
  //after we emit the user we save it to localStorage as a string using JSON.strigify(converts object to string)
  //Then we hand it to autoLogin method
  localStorage.setItem('userData',JSON.stringify(user))
}

private handleError(errorResponse: HttpErrorResponse){
  let errorMessage = 'An unknown error occurred!';
  if(!errorResponse.error || !errorResponse.error.error){
    return throwError(()=>new Error(errorMessage));
  }
  switch (errorResponse.error.error.message){
    case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
    case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project.';  
          break;;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'; 
            break;  
    case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct'; 
            break;      
    case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
              errorMessage = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later'; 
              break;     
  }
  return throwError(()=>new Error(errorMessage));
}


//This will be called when the app is loaded. So we need it in the app.component.ts. 
//We simply call ngOninit in the app.component.ts
autoLogin(){
  const userData:{
    email: string,
    id: string,
    _token: string,
    _tokenExpirationDate: string
  } = JSON.parse(localStorage.getItem('userData'));

  if(!userData){
    return;
  } 

const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
//we check if the token is valid. If it is in the future.
if(loadedUser.token){
  this.user.next(loadedUser);
  //Since the user is loaded we need to calculate how much time left.
  const experiationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();// in milliseconds
  this.autoLogout(experiationDuration);
}

}


}
