import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { CartService } from '../../../shared/service/cart.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public dataProduct = []
  public quantity = []
  public product_id
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.product_id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.loadDataProduct()
  }
  loadDataProduct() {
    this.quantity = []
    this.productService.getDetailProduct(this.product_id ).subscribe(data => {
      this.dataProduct.push(data)

      console.log(data)
    })
  }
  addToCart(product_id, index) {
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
          if (data.error) {
            this.showFail("Product added to cart failed!", "Error!")
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
    this.toastr.success(title, message, { timeOut: 2000, progressBar: true, closeButton: true });
  }

  showFail(title: string, message: string) {
    this.toastr.error(title, message, { timeOut: 2000, progressBar: true, closeButton: true });
  }
}
