import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../shared/service/cart.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {
  public user_id;
  public account_id
  public product_id
  public dataCart = []
  public quantity = 0
  public account_id_up
  public product_id_up
  constructor(
    private cartService: CartService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    let temp_id = localStorage.getItem("user_id")
    this.user_id = temp_id
    this.loadCart(temp_id)
  }

  loadCart(id){
    this.cartService.getCart(id).subscribe(data => {
      this.dataCart = data
      console.log(data)
    })
  }

  getSelected(id, id1){
    console.log(id)
    this.account_id = id
    this.product_id = id1
  }

  deletedProduct(){
    this.cartService.deleteProductCart(this.account_id, this.product_id)
    .pipe(
      catchError((data) => {
        if(data.error) {
          this.showFail("Product basket deletion failed!","Error!")
          this.closeModalById("exampleModal");
        } else {
        }
        return of();
      })
    )
    .subscribe(data => {
      this.showSuccess("Successfully deleted the product in the cart", "Successfully!")
      this.closeModalById("exampleModal");
      this.loadCart(this.user_id)
    })
  }

  //define successful toast
  showSuccess(title: string, message: string) {
    this.toastr.success(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }

  showFail(title: string, message: string) {
    this.toastr.error(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }

  closeModalById(idModal: string){
    document.getElementById(idModal).click();
  }

  getSelectedQuantity(quantity, account_id, product_id){
    this.quantity = quantity
    this.account_id_up = account_id
    this.product_id_up = product_id
  }

  updateCartProduct(){
    console.log(1212122)
    let params = {
      quantity: this.quantity
    }
    this.cartService.updateProductCart(this.account_id_up, this.product_id_up, params)
    .pipe(
      catchError((data) => {
        if(data.error) {
          this.showFail("Update cart failed!","Error!")
          this.closeModalById("exampleModal");
        } else {
        }
        return of();
      })
    )
    .subscribe(data => {
      this.closeModalById("exampleModalUp");
      this.showSuccess("Shopping cart updated successfully!", "Successfully!")
      this.loadCart(this.user_id)
    })
  }

}
