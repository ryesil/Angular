import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import * as moment  from 'moment';

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
  user = new Subject<User>();

  constructor(private http:HttpClient) { }


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
  }
  return throwError(()=>new Error(errorMessage));
}

}
