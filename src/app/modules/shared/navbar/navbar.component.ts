import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  info: any;
  public checkLogout = false
  public checkRole = false
  constructor(private token: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      accountname: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    console.log(this.info)
    if(this.token.getToken()){
      console.log(11111111)
      this.checkLogout = true
    }else{
      console.log(9999999)
      this.checkLogout = false
      localStorage.clear()
      this.logout()
    }

    let temp = localStorage.getItem("user_type")
    if(temp == "ROLE_ADMIN"){
      this.checkRole = true
    }else if(temp == "ROLE_USER"){
      this.checkRole = false
    }

  }


  logout() {
    this.token.signOut();
    // window.location.reload();
    this.router.navigate(['/auth/login']);
  }

}
