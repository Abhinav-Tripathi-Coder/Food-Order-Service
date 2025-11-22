import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models';

const LS = 'fos_cart_v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.load());
  items$ = this.itemsSubject.asObservable();

  constructor() {}

  private load(): CartItem[] {
    try {
      const raw = localStorage.getItem(LS);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  }

  private save(items: CartItem[]) {
    localStorage.setItem(LS, JSON.stringify(items));
    this.itemsSubject.next(items);
  }

  add(item: CartItem) {
    const items = [...this.itemsSubject.value];
    const idx = items.findIndex(i => i.productId === item.productId);
    if (idx >= 0) {
      items[idx].qty += item.qty;
    } else {
      items.push({ ...item });
    }
    this.save(items);
  }

  updateQty(productId: string, qty: number) {
    const items = this.itemsSubject.value.map(i => i.productId === productId ? { ...i, qty } : i)
      .filter(i => i.qty > 0);
    this.save(items);
  }

  remove(productId: string) {
    const items = this.itemsSubject.value.filter(i => i.productId !== productId);
    this.save(items);
  }

  clear() {
    this.save([]);
  }

  getTotal(): number {
    return this.itemsSubject.value.reduce((s, i) => s + i.price * i.qty, 0);
  }
}
