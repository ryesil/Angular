import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService:AuthService, private rap:Router){}

    //this will protect the route from unwanted users.
    //Simply this will check if the user exists, if not then will guard the routes.
    canActivate(route: ActivatedRouteSnapshot,
         router: RouterStateSnapshot
         ): boolean |
          UrlTree |
           Observable<boolean |
            UrlTree> | 
           Promise<boolean | UrlTree> 
           {
            //user returns an ongoing observable that we don't want to listen all the time.
            //we just want to take once and then again if we call the AuthGuard
            return this.authService.user.pipe(take(1),
                map(user=>{
                const isAuth = !!user;
                if(isAuth){
                    return true;
                } 
                return this.rap.createUrlTree(['/auth'])
            }
            ));
        
    }

    //Here authUser value comes from map operator.
//     canActivate(route: ActivatedRouteSnapshot,
//         router: RouterStateSnapshot
//         ): boolean |
//          UrlTree |
//           Observable<boolean |
//            UrlTree> | 
//           Promise<boolean | UrlTree> 
//           {
//            //user returns an ongoing observable that we don't want to listen all the time.
//            //we just want to take once and then again if we call the AuthGuard
//            return this.authService.user.pipe(take(1),
//                map(user=>{
//         //    old way of redirecting if the user is not authenticated
//                return !!user;// this will return the user as boolean; smart
//            })
//            , tap(authUser=>{
//                if(!authUser){
//                    this.rap.navigate(['./auth'])
//                }
//            })
//            );
//    }


    
}