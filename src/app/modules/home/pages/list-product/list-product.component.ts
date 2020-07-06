import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { CartService } from '../../../shared/service/cart.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  public dataProduct = []
  public quantity  = []
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadDataProduct()
  }

  loadDataProduct(){
    this.quantity = []
    this.productService.listProduct().subscribe(data => {
      this.dataProduct = data
      if(data.length > 0){
        for(var i = 0; i < data.length; i++){
          this.quantity.push(1)
        }
      }
      // console.log(data)
    })
  }

  addToCart(product_id, index){
    console.log(product_id + " " + this.quantity[index])
    let account_id = localStorage.getItem("user_id")
    let params = {
      account_id: account_id,
      product_id: product_id,
      quantity: this.quantity[index]
    }
    this.cartService.addToCart(params)
    .pipe(
      catchError((data) => {
        if(data.error) {
          this.showFail("Product added to cart failed!","Error!")
        } else {
        }
        return of();
      })
    )
    .subscribe(data => {
      this.showSuccess("Product successfully added to the shopping cart", "Successfully!")
      this.loadDataProduct()
    })
  }

  showSuccess(title: string, message: string) {
    this.toastr.success(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }

  showFail(title: string, message: string) {
    this.toastr.error(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }

}
