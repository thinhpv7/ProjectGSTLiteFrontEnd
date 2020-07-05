import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import { ProductCartComponent } from './pages/product-cart/product-cart.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // {path: '', redirectTo: 'list', pathMatch: 'full'},
  // { path: 'list', component: ListProductComponent },
  // { path: 'detail', component: ProductDetailComponent },
  // { path: 'manage', component: ManageProductComponent },
  // { path: 'cart', component: ProductCartComponent },
  {path: '', component: HomeComponent, children: [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: ListProductComponent },
    { path: 'detail', component: ProductDetailComponent },
    { path: 'manage', component: ManageProductComponent },
    { path: 'cart', component: ProductCartComponent },
  ]}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
