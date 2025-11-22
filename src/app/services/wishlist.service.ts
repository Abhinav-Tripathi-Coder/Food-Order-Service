import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly STORAGE_KEY = 'fos_wishlist';
  private wishlistSubject = new BehaviorSubject<Product[]>(this.loadWishlist());
  public wishlist$ = this.wishlistSubject.asObservable();

  constructor() {}

  private loadWishlist(): Product[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveWishlist(items: Product[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.wishlistSubject.next(items);
  }

  getWishlist(): Product[] {
    return this.wishlistSubject.value;
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistSubject.value.some(item => item.id === productId);
  }

  isInWishlist$(productId: string): Observable<boolean> {
    return this.wishlist$.pipe(
      map(items => items.some(item => item.id === productId))
    );
  }

  addToWishlist(product: Product): void {
    const currentWishlist = this.wishlistSubject.value;
    if (!this.isInWishlist(product.id)) {
      const newWishlist = [...currentWishlist, product];
      this.saveWishlist(newWishlist);
    }
  }

  removeFromWishlist(productId: string): void {
    const currentWishlist = this.wishlistSubject.value;
    const newWishlist = currentWishlist.filter(item => item.id !== productId);
    this.saveWishlist(newWishlist);
  }

  toggleWishlist(product: Product): boolean {
    if (this.isInWishlist(product.id)) {
      this.removeFromWishlist(product.id);
      return false;
    } else {
      this.addToWishlist(product);
      return true;
    }
  }

  clearWishlist(): void {
    this.saveWishlist([]);
  }

  getWishlistCount(): number {
    return this.wishlistSubject.value.length;
  }
}
