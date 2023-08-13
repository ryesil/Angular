import { TestBed, fakeAsync } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService,AuthResponseData } from "./auth.service";
import { HttpErrorResponse, HttpEventType, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";



describe('AuthService', ()=>{
let service: AuthService;
let httpMock:HttpTestingController;
const dummyData = {
  kind:'testKind',
  idToken: '123abc',
  email:'test@test.com',
  refreshToken:'456def',
  expiresIn:'12344566',
  localId:'1',
  registered:true
}

beforeEach(()=>{
  TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    providers:[AuthService]
  })
  service = TestBed.inject(AuthService);
  httpMock = TestBed.inject(HttpTestingController);
})

afterEach(()=>{
  httpMock.verify();
})

it('should make the service',()=>{
expect(service).toBeTruthy();
})


it('should send a POST request to signup endpoint and return the response', () => {
  const email = 'test@test.com';
  const password = 'safeTesting';

  service.signup(email, password).subscribe((response) => {
    expect(response).toEqual(dummyData);
  });

  const req = httpMock.expectOne(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUp65QqGUF3k2d-uzMWdf117qoSS2WEaw'
  );
  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual({
    email: email,
    password: password,
    returnSecureToken: true,
  });

  //this will respond with the given data.
  req.flush(dummyData);
});
  
it('should send a POST request to login endpoint and return the response',()=>{
  const dummyData: AuthResponseData = {
    kind: 'identitytoolkit#SignupNewUserResponse',
    idToken: 'mockIdToken',
    email: 'test1@test.com',
    refreshToken: 'mockRefreshToken',
    expiresIn: '3600',
    localId: 'mockLocalId',
    registered: true,
  };
  const email = 'test1@test.com';
  const password = '1234abcd';


  service.login(email,password).subscribe(response=>{
    expect(response).toEqual(dummyData);
  });
  const req = httpMock.expectOne('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUp65QqGUF3k2d-uzMWdf117qoSS2WEaw');

  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual({
    email: email,
    password: password,
    returnSecureToken: true,
  });

  req.flush(dummyData);

})

it('should handle signup error and return an error message',()=>{
const email = 'test@test.com';
const password = 'safeTesting';

const mockErrorResponse = {
  error:{
    error:{
     message : 'EMAIL_EXISTS',
    }
  },
}

service.signup(email,password).subscribe({
  next: ()=>{},
error: (error)=>{
  expect(error).toBe(mockErrorResponse);
  expect(()=>{
    throw error;
  }).toThrowError('This email exists already')

  }
}
);

const req = httpMock.expectOne('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUp65QqGUF3k2d-uzMWdf117qoSS2WEaw');
expect(req.request.method).toBe('POST');
req.flush(mockErrorResponse);
})

it('should handle OPERATION_NOT_ALLOWED error', () => {
  const mockErrorResponse: any = {
    error: {
      error: {
        message: 'OPERATION_NOT_ALLOWED'
      }
    }
  };

  service.login('test@example.com', 'password').subscribe({
    next:()=>{},
    error: (error) => {
      expect(error.message).toBe('Password sign-in is disabled for this project.');
    }
  });

  const req = httpMock.expectOne('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUp65QqGUF3k2d-uzMWdf117qoSS2WEaw');
  expect(req.request.method).toBe('POST');
  req.flush(mockErrorResponse);
});

it('should handle TOO_MANY_ATTEMPTS_TRY_LATER error', ()=>{
  const email = 'test@test.com';
  const password = 'safeTesting';
  const mockErrorResponse: any = {
    error: {
      error: {
        message: 'TOO_MANY_ATTEMPTS_TRY_LATER'
      }
    }
  };

  service.login('test@example.com', 'password').subscribe({
    next:()=>{},
    error: (error) => {
      expect(error.message).toBe('We have blocked all requests from this device due to unusual activity. Try again later.');
    }
  });

  const req = httpMock.expectOne('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUp65QqGUF3k2d-uzMWdf117qoSS2WEaw');
  expect(req.request.method).toBe('POST');
  req.flush(mockErrorResponse);
});



});
