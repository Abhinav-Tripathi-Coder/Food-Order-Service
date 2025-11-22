// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { ShopRoutingModule } from './shop-routing.module';


// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     ShopRoutingModule
//   ]
// })
// export class ShopModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShopHomeComponent } from './shop-home/shop-home.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ShopHomeComponent, ProductCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild([
      { path: '', component: ShopHomeComponent }
    ])
  ]
})
export class ShopModule {}
