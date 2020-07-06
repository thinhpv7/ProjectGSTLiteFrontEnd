import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  public product_id
  public arrCategory = []
  public arrData = {
    name: "",
    price: 0,
    description: "",
    product_code: "",
    category: 0
  }
  public images = []
  public countImage = 0
  public temp_image = []
  public checkChange = false
  public arrImage = []
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitization: DomSanitizer,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.product_id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.getCategory()
    this.getDetailProduct(this.product_id)
  }

  updateProduct(ev){
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
    this.productService.updateProduct(this.product_id, params).subscribe(data => {
      if(this.checkChange){
        this.saveImage(this.product_id)
      }else{
        this.router.navigate(['/product/manage/'])
        this.showSuccess("Your product has been successfully updated", "Successfully")
      }
    })
  }

  changeImageProduct(files){
    if(files != undefined){
      this.checkChange = true
      this.images = []
      this.arrImage = []
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
        this.productService.deleteImageProduct(this.product_id).subscribe(data => {
          console.log(data)
        })
      }
    }
  }

  getDetailProduct(id){
    this.productService.getDetailProduct(id).subscribe(data => {
      // console.log(data)
      this.arrImage = data.image
      this.arrData = {
        name: data.name,
        price: data.price,
        description: data.description,
        product_code: data.product_code,
        category: data.category_ID
      }
    })
  }

  getCategory(){
    this.productService.listCategory().subscribe(data => {
      this.arrCategory = data
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
          this.showSuccess("Your product has been successfully updated", "Successfully")
          this.router.navigate(['/product/manage/'])
        }, 500);
      }
    })
  }

  saveImageProduct(prams){
    this.productService.addImageProduct(prams).subscribe(data => {
      console.log(data)
    })

  }

   //define successful toast
   showSuccess(title: string, message: string) {
    this.toastr.success(title, message, {timeOut: 2000, progressBar: true, closeButton: true});
  }

}
