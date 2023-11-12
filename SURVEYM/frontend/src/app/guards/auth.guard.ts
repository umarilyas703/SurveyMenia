import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

//Reference:
//MEAN Stack Front To Back
//Author: "Traversy Media"

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private router: Router,
        private authService: AuthService        
      ) { }

      canActivate(){
        if(this.authService.loggedIn()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
      }
    
}