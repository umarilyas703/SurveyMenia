import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "../services/auth.service";

//Reference:
//MEAN Stack Front To Back
//Author: "Traversy Media"

@Injectable()
export class AdminGuard implements CanActivate{
    constructor(
        private router: Router,
        private authService: AuthService        
      ) { }

      canActivate(){ 
        const role = localStorage.getItem('role');               
        if(role === '"ADMIN"'){                              
            return true;   
        } else{
            this.router.navigate(['/user']);
            console.log('UNAUTHORIZED');
            return false;            
        }
      }
    
}