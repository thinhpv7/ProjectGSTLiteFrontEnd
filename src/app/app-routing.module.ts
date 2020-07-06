import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';


const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'product', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'register', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
