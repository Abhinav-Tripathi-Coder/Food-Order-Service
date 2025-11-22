import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  items$!: Observable<CartItem[]>;
  total = 0;
  
  constructor(private cartService: CartService, private router: Router) {
    this.items$ = this.cartService.items$;
    this.cartService.items$.subscribe(_ => this.total = this.cartService.getTotal());
  }

  inc(i: CartItem): void { 
    this.cartService.updateQty(i.productId, i.qty + 1); 
  }
  
  dec(i: CartItem): void { 
    if (i.qty > 1) {
      this.cartService.updateQty(i.productId, i.qty - 1);
    }
  }
  
  remove(i: CartItem): void { 
    this.cartService.remove(i.productId); 
  }
  
  checkout(): void { 
    this.router.navigate(['/cart/checkout']); 
  }
}
