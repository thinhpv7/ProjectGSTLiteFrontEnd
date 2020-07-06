import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config/config.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient, 
    private config: ConfigService,
    private token: TokenStorageService, 
    private router: Router
  ) { }

  cartUrl = this.config.getConfig().cart;

  getCart(id):Observable<any>{
    return this.http.get(this.cartUrl.list_single.replace(":id", id));
  }

  deleteProductCart(id, id1):Observable<any>{
    return this.http.delete(this.cartUrl.delete.replace(":account_id", id).replace(":product_id", id1));
  }

  updateProductCart(id, id1, params):Observable<any>{
    return this.http.put(this.cartUrl.update.replace(":account_id", id).replace(":product_id", id1), params);
  }

  addToCart(params):Observable<any>{
    return this.http.post(this.cartUrl.add, params);
  }
}
