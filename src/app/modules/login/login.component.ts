import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    window.sessionStorage.clear();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  loginUser(e){
    e.preventDefault();
    // const email = e.target.elements[0].value;
    // const password = e.target.elements[1].value;
    let params = {
      accountname: e.target.elements[0].value,
      password: e.target.elements[1].value
    }

    console.log(params)

    this.authService.login(params)
    .pipe(
    )
    .subscribe(data => {
      localStorage.removeItem("user_id")
      localStorage.removeItem("user_type")
      localStorage.setItem("user_id", data.id['id'])
      let temp = this.tokenStorage.getAuthorities();
      localStorage.setItem("user_type", data.authorities[0].authority)
      if(localStorage.getItem("token")){
        localStorage.removeItem("token")
        localStorage.setItem("token", data.accessToken)
      }else{
        localStorage.setItem("token", data.accessToken)
      }
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveUsername(data.accountname);
      this.tokenStorage.saveAuthorities(data.authorities);
      // localStorage
      if(data.authorities[0].authority == "ROLE_USER"){
        this.router.navigate(['/product/list/'])
      }else if(data.authorities[0].authority == "ROLE_ADMIN"){
        this.router.navigate(['/product/manage/'])
      }
      
    })
    
    
  }

}
