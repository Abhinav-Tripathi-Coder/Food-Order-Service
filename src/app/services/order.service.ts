// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class OrderService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class OrderService {
  base = '/api/orders';
  constructor(private http: HttpClient) {}

  place(order: Omit<Order, 'id'|'placedAt'|'status'> & { userId?: string }): Observable<Order> {
    const payload: Order = {
      id: uuidv4(),
      ...order,
      placedAt: new Date().toISOString(),
      status: 'placed'
    };
    return this.http.post<Order>(this.base, payload);
  }

  list(): Observable<Order[]> {
    return this.http.get<Order[]>(this.base);
  }

  get(id: string) {
    return this.http.get<Order>(`${this.base}/${id}`);
  }

  updateStatus(id: string, status: Order['status']) {
    return this.http.patch<Order>(`${this.base}/${id}`, { status });
  }

  cancelOrder(id: string): Observable<Order> {
    return this.http.patch<Order>(`${this.base}/${id}`, { status: 'cancelled' });
  }
}
