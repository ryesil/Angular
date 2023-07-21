import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError,throwError } from 'rxjs';
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

  constructor(private http:HttpClient) { }


signup(email:string, password:string){
return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUp65QqGUF3k2d-uzMWdf117qoSS2WEaw',{
  email:email,
  password:password,
  returnSecureToken:true
}).pipe(catchError(this.handleError));
}



login(email:string, password:string){

return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUp65QqGUF3k2d-uzMWdf117qoSS2WEaw',{
  email:email,
  password:password,
  returnSecureToken:true
}).pipe(catchError(this.handleError));

}

private handleError(errorResponse: HttpErrorResponse){
  let errorMessage = 'An unknown error occurred!';
  if(!errorResponse.error || !errorResponse.error.error){
    return throwError(()=>new Error(errorMessage));
  }
  switch (errorResponse.error.error.message){
    case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
    case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project.';  
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';      
  }
  return throwError(()=>new Error(errorMessage));
}

}
