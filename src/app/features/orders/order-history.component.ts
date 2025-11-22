import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models';

@Component({
  selector: 'app-order-history',
  standalone: false,
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  loading = true;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    const currentUser = this.authService.currentUser;
    if (!currentUser) {
      this.loading = false;
      return;
    }

    this.orderService.list().subscribe({
      next: orders => {
        this.orders = orders
          .filter(order => order.userId === currentUser.id)
          .sort((a, b) => 
            new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
          );
        this.loading = false;
      },
      error: err => {
        console.error('Error loading orders:', err);
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'placed': 'status-placed',
      'confirmed': 'status-confirmed',
      'out-for-delivery': 'status-out-for-delivery',
      'delivered': 'status-delivered',
      'cancelled': 'status-cancelled'
    };
    return statusMap[status] || '';
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      'placed': 'Placed',
      'confirmed': 'Confirmed',
      'out-for-delivery': 'Out for Delivery',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled'
    };
    return labels[status] || status;
  }

  canCancelOrder(status: string): boolean {
    return status === 'placed';
  }

  cancelOrder(orderId: string) {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: updatedOrder => {
          const index = this.orders.findIndex(o => o.id === orderId);
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          }
          alert('Order cancelled successfully!');
        },
        error: err => {
          console.error('Error cancelling order:', err);
          alert('Failed to cancel order. Please try again.');
        }
      });
    }
  }
}
