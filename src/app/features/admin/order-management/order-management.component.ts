import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models';

@Component({
  selector: 'app-order-management',
  standalone: false,
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  loading = true;
  selectedStatus: string = 'all';

  statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'placed', label: 'Placed' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'out-for-delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.list().subscribe({
      next: orders => {
        this.orders = orders.sort((a, b) => 
          new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
        );
        this.filterOrders();
        this.loading = false;
      },
      error: err => {
        console.error('Error loading orders:', err);
        this.loading = false;
      }
    });
  }

  filterOrders() {
    if (this.selectedStatus === 'all') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(order => order.status === this.selectedStatus);
    }
  }

  onStatusFilterChange() {
    this.filterOrders();
  }

  updateOrderStatus(orderId: string, newStatus: Order['status']) {
    this.orderService.updateStatus(orderId, newStatus).subscribe({
      next: updatedOrder => {
        const index = this.orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
          this.orders[index] = updatedOrder;
          this.filterOrders();
        }
      },
      error: err => {
        console.error('Error updating order status:', err);
        alert('Failed to update order status. Please try again.');
      }
    });
  }

  getNextStatus(currentStatus: Order['status']): Order['status'] | null {
    const statusFlow: { [key: string]: Order['status'] | null } = {
      'placed': 'confirmed',
      'confirmed': 'out-for-delivery',
      'out-for-delivery': 'delivered',
      'delivered': null,
      'cancelled': null
    };
    return statusFlow[currentStatus];
  }

  canUpdateStatus(status: Order['status']): boolean {
    return status !== 'delivered' && status !== 'cancelled';
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

  getNextStatusLabel(status: Order['status']): string {
    const nextStatus = this.getNextStatus(status);
    return nextStatus ? this.getStatusLabel(nextStatus) : '';
  }
}
