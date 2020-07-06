import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

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
    this.authService.register(params).subscribe(data => {
      this.showSuccess("Your account has been successfully registered", "Successfully")
      this.router.navigate(['/auth/login/'])
    })
  }

   //define successful toast
   showSuccess(title: string, message: string) {
    this.toastr.success(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }

}
