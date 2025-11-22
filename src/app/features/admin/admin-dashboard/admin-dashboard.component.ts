import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { OrderService } from '../../../services/order.service';
import { Product, Order } from '../../../models';
import { FormBuilder } from '@angular/forms';

@Component({
  standalone: false,
  template: `
  <h2>Admin Dashboard</h2>
  <section>
    <h3>Products</h3>
    <table mat-table [dataSource]="products">
      <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Name</th><td mat-cell *matCellDef="let p">{{p.name}}</td></ng-container>
      <ng-container matColumnDef="price"><th mat-header-cell *matHeaderCellDef>Price</th><td mat-cell *matCellDef="let p">₹{{p.price}}</td></ng-container>
      <tr mat-header-row *matHeaderRowDef="['name','price']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['name','price']"></tr>
    </table>
  </section>

  <section>
    <h3>Orders</h3>
    <div *ngFor="let o of orders">
      <strong>{{o.id}}</strong> - ₹{{o.total}} - {{o.status}} - {{o.placedAt | date:'short'}}
    </div>
  </section>
  `
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];
  orders: Order[] = [];
  constructor(private p: ProductService, private o: OrderService, private fb: FormBuilder) {}
  ngOnInit() {
    this.p.list().subscribe(r => this.products = r);
    this.o.list().subscribe(r => this.orders = r);
  }
}
