import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../../config/config.service';
import { Observable, Subject } from 'rxjs';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient, 
    private config: ConfigService,
    private token: TokenStorageService, 
    private router: Router
  ) { }
  authUrl = this.config.getConfig().auth;

  login(params):Observable<any>{
    return this.http.post(this.authUrl.login, params);
  }

  register(params):Observable<any>{
    return this.http.post(this.authUrl.register, params);
  }

  private fooSubject = new Subject<any>();

  publishSomeData(data: any) {
      this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
      return this.fooSubject;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const user_type = localStorage.getItem('user_type');
    if(this.token.getToken()){
      return true
    }
    return false;
  }
}
