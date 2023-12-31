import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

//Reference:
//MEAN Stack Front To Back
//Author: "Traversy Media"


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  authToken: any;
  user: any; 
  role: any; 


  constructor(private http:HttpClient) { }

  registerUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post('https://survey-menia-backend2.onrender.com/register', user, {headers: headers});

      //.pipe(map(res => JSON.stringify(res)));
  }

  getbycode(code:any){
    return this.http.get('https://survey-menia-backend2.onrender.com/register' + '/' + code);
  }

  authenticateUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post('https://survey-menia-backend2.onrender.com/authenticate', user, {headers: headers});
  }  

  getProfile(){
    let headers = new HttpHeaders();
    this.loadToken();    
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get('https://survey-menia-backend2.onrender.com/profile', {headers: headers});
  }

  Updateuser(user: any, code:any){
    return this.http.put('https://survey-menia-backend2.onrender.com/register', user, code)
  }

  storeUserData(token: any, user: any, role: any){    
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));     
    localStorage.setItem('role', JSON.stringify(role));
    this.authToken = token;
    this.user = user; 
    this.role = role; 
        
  }

  storeEuserData(token: any, user: any){    
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));     
    
    this.authToken = token;
    this.user = user; 
    
        
  }

  getLoggedInUserId(): string {
    return this.user ? this.user.id : null;
  }
  getLoggedInUserName(): string{
    return this.user ? this.user.fname: null;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');    
    this.authToken = token;
  }

  loggedIn(){
    const token = localStorage.getItem('id_token');
    const jwtHelper = new JwtHelperService ();
    return token != null && !jwtHelper.isTokenExpired(token);
  }  

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
