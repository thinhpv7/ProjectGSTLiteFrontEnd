import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { validate } from 'json-schema';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl("",[Validators.required]),
    password:  new FormControl("",[Validators.required]),
    name: new FormControl("",[Validators.required]),
    email:  new FormControl("",[Validators.required]),
  })
  public checkError = false
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  registerUser(ev){
    const username = ev.target.elements[0].value;
    const password = ev.target.elements[1].value;
    const name = ev.target.elements[2].value;
    const email = ev.target.elements[3].value;
    let params = {
    name: name,
    accountname: username,
    password: password,
    email: email,
    role: ["user"]
    }
    if(this.registerForm.valid){
      this.checkError = false
      this.authService.register(params)
      .pipe(
        catchError((data) => {
          if(data.error) {
            this.showFail("Register Fail!","Error!")
          } else {
          }
          return of();
        })
      )
      .subscribe(data => {
        this.showSuccess("Your account has been successfully registered", "Successfully")
        this.router.navigate(['/auth/login/'])
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
