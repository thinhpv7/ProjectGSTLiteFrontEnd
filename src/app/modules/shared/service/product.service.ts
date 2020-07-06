import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config/config.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient, 
    private config: ConfigService,
    private token: TokenStorageService, 
    private router: Router
  ) { }
  productUrl = this.config.getConfig().product;
  categoryUrl = this.config.getConfig().category;
  

  listProduct():Observable<any>{
    return this.http.get(this.productUrl.list);
  }

  deleteProduct(id):Observable<any>{
    return this.http.delete(this.productUrl.delete.replace(':id', id));
  }

  deleteProductCart(id):Observable<any>{
    return this.http.delete(this.productUrl.delete_product_cart.replace(':id', id));
  }

  deleteImageProduct(id):Observable<any>{
    return this.http.delete(this.productUrl.delete_image_product.replace(':id', id));
  }

  listCategory():Observable<any>{
    return this.http.get(this.categoryUrl.list);
  }

  createProduct(params):Observable<any>{
    return this.http.post(this.productUrl.create, params);
  }

  updateProduct(id, params):Observable<any>{
    return this.http.put(this.productUrl.update.replace(':id', id), params);
  }

  uploadImageProduct(params):Observable<any>{
    return this.http.post(this.productUrl.upload, params);
  }

  getImageProduct():Observable<any>{
    return this.http.get(this.productUrl.list_image);
  }

  addImageProduct(params):Observable<any>{
    return this.http.post(this.productUrl.add_image_product, params);
  }

  getDetailProduct(id):Observable<any>{
    return this.http.get(this.productUrl.detail.replace(':id', id));
  }

}
