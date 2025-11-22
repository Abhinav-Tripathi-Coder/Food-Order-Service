import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Product } from '../../../models';
import { WishlistService } from '../../../services/wishlist.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() add = new EventEmitter<Product>();

  isInWishlist$!: Observable<boolean>;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.isInWishlist$ = this.wishlistService.isInWishlist$(this.product.id);
  }

  onAddClick(): void {
    this.add.emit(this.product);
  }

  toggleWishlist(): void {
    this.wishlistService.toggleWishlist(this.product);
  }

  onImageError(event: Event): void {
    // If image fails to load, hide it
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none';
  }
}

