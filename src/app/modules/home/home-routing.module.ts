import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import { ProductCartComponent } from './pages/product-cart/product-cart.component';
import { RoleGuardService as RoleGuard } from '../shared/service/role-guard.service';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { UpdateProductComponent } from './pages/update-product/update-product.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  // {path: '', redirectTo: 'list', pathMatch: 'full'},
  // { path: 'list', component: ListProductComponent },
  // { path: 'detail', component: ProductDetailComponent },
  // { path: 'manage', component: ManageProductComponent },
  // { path: 'cart', component: ProductCartComponent },
  {path: '', component: HomeComponent
  // canActivate: [RoleGuard], 
  // data: {
  //   expectedRole: 'ROLE_USER',
  // }
  , children: [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: ListProductComponent
    ,canActivate: [RoleGuard], 
    data: {
      expectedRole: 'ROLE_USER',
    }
  },
    { path: 'detail', component: ProductDetailComponent
    // canActivate: [RoleGuard], 
    // data: {
    //   expectedRole: 'ROLE_USER',
    // } 
  },
  { path: 'cart', component: ProductCartComponent
    ,canActivate: [RoleGuard], 
    data: {
      expectedRole: 'ROLE_USER',
    } 
  },
  { path: 'manage', component: ManageProductComponent
    ,canActivate: [RoleGuard], 
    data: {
      expectedRole: 'ROLE_ADMIN',
    }  
  },
  { path: 'create', component: CreateProductComponent
    ,canActivate: [RoleGuard], 
    data: {
      expectedRole: 'ROLE_ADMIN',
    }  
  },
  { path: 'update/:id', component: UpdateProductComponent
    ,canActivate: [RoleGuard], 
    data: {
      expectedRole: 'ROLE_ADMIN',
    }  
  }
  ]}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
