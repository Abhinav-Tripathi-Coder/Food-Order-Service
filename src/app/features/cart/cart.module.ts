// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { CartRoutingModule } from './cart-routing.module';


// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     CartRoutingModule
//   ]
// })
// export class CartModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CartPageComponent, CheckoutPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule.forChild([
      { path: '', component: CartPageComponent },
      { path: 'checkout', component: CheckoutPageComponent }
    ])
  ]
})
export class CartModule {}
