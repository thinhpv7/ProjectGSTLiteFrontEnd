import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  public arrProduct = []
  public idDelete
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct(){
    this.productService.listProduct().subscribe(data => {
      console.log(data)
      this.arrProduct = data
    })
  }
  getSelected(id){
    console.log(id)
    this.idDelete = id
  }

  deletedProduct(){
    console.log(this.idDelete)
    this.productService.deleteProductCart(this.idDelete)
    .pipe(
      catchError((data) => {
        if(data.error) {
          this.deleteProduct(this.idDelete)
        } else {
        }
        return of();
      })
    )
    .subscribe(data => {
      this.deleteProduct(this.idDelete)
    })
  }

  deleteProduct(id){
    this.productService.deleteProduct(id).subscribe(data => {
      this.closeModalById("exampleModal");
      this.showSuccess("Product deleted successfully.", "Successfully!")
      this.loadProduct()
    })
  }

  //define successful toast
  showSuccess(title: string, message: string) {
    this.toastr.success(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }

  closeModalById(idModal: string){
    document.getElementById(idModal).click();
  }

}
