// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { AdminRoutingModule } from './admin-routing.module';


// @NgModule({
//   declarations: [],
//   imports: [
//     CommonModule,
//     AdminRoutingModule
//   ]
// })
// export class AdminModule { }


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { OrderManagementComponent } from './order-management/order-management.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserManagementComponent,
    OrderManagementComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: AdminDashboardComponent, 
        canActivate: [AuthGuard] 
      },
      { 
        path: 'users', 
        component: UserManagementComponent, 
        canActivate: [AuthGuard] 
      },
      { 
        path: 'orders', 
        component: OrderManagementComponent, 
        canActivate: [AuthGuard] 
      }
    ])
  ]
})
export class AdminModule {}
