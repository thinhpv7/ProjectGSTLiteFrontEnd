import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { pipe, of } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

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
  public checkError = false
  roles: string[] = [];
  loginForm = new FormGroup({
    username: new FormControl("",[Validators.required]),
    password:  new FormControl("",[Validators.required]),
  })
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private toastr: ToastrService
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
    this.checkError = false

    if(this.loginForm.valid){
      this.authService.login(params)
      .pipe(
        catchError((data) => {
          if(data.error) {
            this.showFail("Login Fail!","Error!")
          } else {
          }
          return of();
        })
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
        this.showSuccess("Login Successfully!", "Successfully")
        
      })
    }else{
      this.checkError = true
    }
  }

  //define successful toast
  showSuccess(title: string, message: string) {
    this.toastr.success(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }

  showFail(title: string, message: string) {
    this.toastr.error(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }

}
