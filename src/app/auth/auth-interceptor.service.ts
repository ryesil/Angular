import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

//We need to provide this interceptor in the app.module.ts. Look at providers line.
//Earlier we tried to add token to fetch data.
//Here we are using an interceptor to add the token to all outgoing requests.
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Here is also we are handling with two observables.

   return  this.authService.user.pipe(take(1),exhaustMap(user=>{
    //we cloned the req. And then added the auth param to it
      const modifiedReq = req.clone({params: new HttpParams().set('auth',user.token)})
      return next.handle(modifiedReq);
    }))
   
  }
}
