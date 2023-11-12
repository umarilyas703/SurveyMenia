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
    return this.http.post('http://localhost:3000/register', user, {headers: headers});

      //.pipe(map(res => JSON.stringify(res)));
  }

  getbycode(code:any){
    return this.http.get('http://localhost:3000/register' + '/' + code);
  }

  authenticateUser(user: any){
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/authenticate', user, {headers: headers});
  }  

  getProfile(){
    let headers = new HttpHeaders();
    this.loadToken();    
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/profile', {headers: headers});
  }

  Updateuser(user: any, code:any){
    return this.http.put('http://localhost:3000/register', user, code)
  }

  storeUserData(token: any, user: any, role: any){    
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));     
    localStorage.setItem('role', JSON.stringify(role));
    this.authToken = token;
    this.user = user; 
    this.role = role;     
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
