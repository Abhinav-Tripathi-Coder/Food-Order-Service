import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlistItems$!: Observable<Product[]>;

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.wishlistItems$ = this.wishlistService.wishlist$;
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId);
  }

  addToCart(product: Product): void {
    this.cartService.add({
      productId: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.image
    });
    // Optionally remove from wishlist after adding to cart
    // this.wishlistService.removeFromWishlist(product.id);
  }

  moveToCart(product: Product): void {
    this.addToCart(product);
    this.removeFromWishlist(product.id);
  }
}
