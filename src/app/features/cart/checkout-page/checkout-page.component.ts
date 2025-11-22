// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-checkout-page',
//   imports: [],
//   templateUrl: './checkout-page.component.html',
//   styleUrl: './checkout-page.component.scss'
// })
// export class CheckoutPageComponent {

// }


import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Order } from '../../../models';

@Component({
  selector: 'app-checkout-page',
  standalone: false,
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  f;
  total = 0;
  
  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.f = this.fb.group({
      address: ['', Validators.required],
      payment: ['Cash on delivery']
    });
    this.total = cartService.getTotal();
  }

  submit(): void {
    if (this.f.invalid) {
      return;
    }

    // Snapshot current items
    const currentItems = (this.cartService as any).itemsSubject?.value ?? [];
    const currentUser = this.authService.currentUser;
    
    const payload: Omit<Order, 'id'|'placedAt'|'status'> = {
      items: currentItems,
      total: this.total,
      address: this.f.value.address || '',
      userId: currentUser?.id,
      userName: currentUser?.username
    };

    this.orderService.place(payload).subscribe({
      next: () => {
        this.cartService.clear();
        alert('Order placed successfully! 🎉');
        this.router.navigate(['/orders']);
      },
      error: () => {
        alert('Order failed. Please try again.');
      }
    });
  }
}
 