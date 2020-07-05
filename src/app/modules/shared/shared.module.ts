import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';


const COMPONENTS = [
  NavbarComponent
]

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [],
  exports: [
    CommonModule,
    ...COMPONENTS
  ]
})
export class SharedModule { }
