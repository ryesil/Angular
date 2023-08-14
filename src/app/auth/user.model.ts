//This model stores all the core data that makes up a user and even 
//helps us with validating whether that token is still valid
//B/c the token will expire in one hr.

export class User {
    //shortcut of authomaticallyt storing the arguments
    constructor(public email: string,
         public id: string,
          private _token: string,
           private _tokenExpirationDate: Date){}


    get token(){
        // if tokenExpirationdate doesn't exist or expired
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }


}