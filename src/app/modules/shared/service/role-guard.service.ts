import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { ignoreElements } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate, CanActivateChild {

  constructor(
    public auth: AuthService, 
    public router: Router, 
    // private studentContentService: StudentContentService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // let temp = route["_routerState"]['url']
    // let result = temp.substring(1, 23)
    // console.log(temp)
    // if(result == "student-content/update"){
    //     let temp_id = route.params.id
    //     this.studentContentService.getStudentContent(temp_id).subscribe(data => {
    //       if(data.status == 'publish' && localStorage.getItem("user_type") == "subscriber"){
    //         this.router.navigate(['/profile']);
    //         return false;
    //       }
    //     })
    // }
  
    const expectedRole = route.data
    var check_role = false;
    let roles = Object.entries(expectedRole)
    for(var i = 0; i < roles.length; i++){
      if(localStorage.getItem('user_type') == roles[i][1]){
        check_role = true
      }
    }
    if (!this.auth.isAuthenticated()){
      this.router.navigate(['/auth/login']);
      return false;
    }
    if(!check_role){
      if(localStorage.getItem("user_type") == "ROLE_ADMIN"){
        this.router.navigate(['/product/manage']);
      }else if(localStorage.getItem("user_type") == "ROLE_USER"){
        this.router.navigate(['/product/list']);
      }
      return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data
    var check_role = false;
    let roles = Object.entries(expectedRole)
    for(var i = 0; i < roles.length; i++){
      if(localStorage.getItem('user_type') == roles[i][1]){
        check_role = true
      }
    }

    if (!this.auth.isAuthenticated()){
      this.router.navigate(['/auth/login']);
      return false;
    }
    if(localStorage.getItem('user_type') != 'admin'){
      this.router.navigate(['/profile']);
      return false;
    }
    return true;
  }
}
