import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductCartComponent } from './pages/product-cart/product-cart.component';
import { SharedModule } from '../shared';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';

@NgModule({
  declarations: [HomeComponent, ListProductComponent, ProductDetailComponent, ProductCartComponent, ManageProductComponent, CreateProductComponent, UpdateProductComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HomeModule { }
