import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  public arrCategory = []
  public images = []
  public countImage = 0
  public temp_image = []
  public temp_id
  constructor(
    private productService: ProductService,
    private sanitization: DomSanitizer,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCategory()
  }

  getCategory(){
    this.productService.listCategory().subscribe(data => {
      console.log(data)
      this.arrCategory = data
    })
  }

  createProduct(ev){
    const name = ev.target.elements[0].value;
    const price = ev.target.elements[1].value;
    const description = ev.target.elements[2].value;
    const category = ev.target.elements[3].value;
    const code = ev.target.elements[4].value;
    let params = {
      description: description,
      price: price,
      name: name,
      product_code: code,
      category_ID: category
    }
    this.productService.createProduct(params).subscribe(data => {
      console.log(data)
      this.temp_id = data.id
      this.saveImage(data.id)
      
    })
  }

  saveImage(id){
    let formData = new FormData()
    console.log(this.temp_image)
    if(this.temp_image.length > 0){
      for(var i = 0; i < this.temp_image.length; i++){
        console.log(this.temp_image[i])
        formData.append("files", this.temp_image[i])
      }
      this.productService.uploadImageProduct(formData).subscribe(data =>{
        console.log(data)
        this.getImage(id)
      })
    }
  }

  getImage(id){
    this.productService.getImageProduct().subscribe(data => {
      console.log(data)
      if(data.length >= this.countImage){
        for(var i = data.length -  this.countImage; i < data.length; i++){
          let params = {
            "url": data[i].url,
            "product_id": id
          }
          this.saveImageProduct(params)
        }
        setTimeout(() => {
          this.showSuccess("Your product has been successfully created", "Successfully")
          this.router.navigate(['/product/manage/'])
        }, 300);
      }
    })
  }

  saveImageProduct(prams){
    this.productService.addImageProduct(prams).subscribe(data => {
      console.log(data)
    })

  }

  changeImageProduct(files){
    this.images = []
    if(files.length > 0){
      this.temp_image = files
      this.countImage = files.length
      for (var i = 0; i < files.length; i++){
        let temp = files[i]
        let t = URL.createObjectURL(temp)
        let t1 = this.sanitization.bypassSecurityTrustUrl(t)
        this.images.push(t1)
        // this.countImage.push(temp);
      }
    }
  }

   //define successful toast
   showSuccess(title: string, message: string) {
    this.toastr.success(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }

}
