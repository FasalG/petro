import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  toastId: any;
  currentToast: any
  constructor( private router:Router,
        
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {


    const data = localStorage.getItem('userdetails')
    let userDetails :any=null
    if(data){
        userDetails= JSON.parse(data);
    }
    
    if (userDetails !== null) {       
        return true; // Allow access to the route      
    }else{
        this.router.navigate(['/login'])
        return false
     
    }

    return false

  } 
}