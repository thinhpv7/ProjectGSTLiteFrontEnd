import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl: any = {

    "production": environment.production,
    "base": environment.apiUrl,

    "auth": {
        "login": environment.apiUrl + 'api/auth/signin/',
        "register": environment.apiUrl + "api/auth/signup/",
        "logout": environment.apiUrl + 'auth/logout/',
    },
    "category": {
      "list": environment.apiUrl + "category_all",
      "create": environment.apiUrl + "category",
      "update": environment.apiUrl + "category/:id/",
      "delete": environment.apiUrl + "category/:id/"
    },
    "product": {
      "list": environment.apiUrl + "product_all",
      "create": environment.apiUrl + "product",
      "update": environment.apiUrl + "product/:id/",
      "delete": environment.apiUrl + "product/:id/",
      "delete_product_cart": environment.apiUrl + "delete_product/:id/",
      "detail": environment.apiUrl + "product/:id/",
      "upload": environment.apiUrl + "upload/",
      "list_image": environment.apiUrl + "files/",
      "add_image_product": environment.apiUrl + "image_product/",
      "delete_image_product": environment.apiUrl + "image_product/:id/" 
    },
    "cart": {
      "list": environment.apiUrl + "account_product_all",
      "add": environment.apiUrl + "account_product",
      "update": environment.apiUrl + "account_product/:account_id/:product_id/",
      "delete": environment.apiUrl + "account_product/:account_id/:product_id/",
      "list_single": environment.apiUrl + "account_product/:id/",
    }
  }
  getConfig() {
    return this.configUrl;
  }
  constructor() { }
}
