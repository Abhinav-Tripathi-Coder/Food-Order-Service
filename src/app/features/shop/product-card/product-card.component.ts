// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product-card',
//   imports: [],
//   templateUrl: './product-card.component.html',
//   styleUrl: './product-card.component.scss'
// })
// export class ProductCardComponent {

// }


// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { Product } from '../../../models';

// @Component({
//   selector: 'app-product-card',
//   template: `
//   <mat-card>
//     <img *ngIf="product.image" [src]="product.image" alt="{{product.name}}">
//     <mat-card-title>{{product.name}}</mat-card-title>
//     <mat-card-content>
//       <p>{{product.description}}</p>
//       <strong>₹ {{product.price | number:'1.2-2'}}</strong>
//     </mat-card-content>
//     <mat-card-actions>
//       <button mat-raised-button color="primary" (click)="add()">Add</button>
//     </mat-card-actions>
//   </mat-card>
//   `
// })
// export class ProductCardComponent {
//   @Input() product!: Product;
//   @Output() add = new EventEmitter<Product>();
//   addClick() { this.add.emit(this.product); }
//   // keep compatibility name
//   // add() { this.add.emit(this.product); }
// }


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

