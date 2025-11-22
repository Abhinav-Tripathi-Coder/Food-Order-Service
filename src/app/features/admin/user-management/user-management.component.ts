import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User, LoginLog } from '../../../models';

@Component({
  selector: 'app-user-management',
  standalone: false,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  activeUsers: LoginLog[] = [];
  displayedColumns: string[] = ['username', 'name', 'role', 'createdAt', 'lastLogin', 'actions'];
  userForm!: FormGroup;
  editingUser: User | null = null;
  showForm = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadUsers();
    this.loadActiveUsers();
  }

  initForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: users => {
        this.users = users.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },
      error: err => console.error('Error loading users:', err)
    });
  }

  loadActiveUsers() {
    this.authService.getActiveUsers().subscribe({
      next: logs => {
        this.activeUsers = logs.filter(log => !log.logoutTime);
      },
      error: err => console.error('Error loading active users:', err)
    });
  }

  openForm() {
    this.editingUser = null;
    this.userForm.reset({ role: 'user' });
    this.showForm = true;
  }

  editUser(user: User) {
    this.editingUser = user;
    this.userForm.patchValue({
      username: user.username,
      password: '',
      name: user.name,
      role: user.role
    });
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
    this.showForm = true;
  }

  submitForm() {
    if (this.userForm.invalid) {
      return;
    }

    const formValue = this.userForm.value;

    if (this.editingUser) {
      const updates: Partial<User> = {
        name: formValue.name,
        role: formValue.role
      };
      
      if (formValue.password) {
        updates.password = formValue.password;
      }

      this.authService.updateUser(this.editingUser.id, updates).subscribe({
        next: () => {
          alert('User updated successfully!');
          this.loadUsers();
          this.cancelForm();
        },
        error: err => alert('Error updating user: ' + err.message)
      });
    } else {
      this.authService.createUser(formValue).subscribe({
        next: () => {
          alert('User created successfully!');
          this.loadUsers();
          this.cancelForm();
        },
        error: err => alert('Error creating user: ' + err.message)
      });
    }
  }

  deleteUser(user: User) {
    if (user.role === 'admin' && user.username === 'admin') {
      alert('Cannot delete the main admin account!');
      return;
    }

    if (confirm(`Are you sure you want to delete user "${user.username}"?`)) {
      this.authService.deleteUser(user.id).subscribe({
        next: () => {
          alert('User deleted successfully!');
          this.loadUsers();
        },
        error: err => alert('Error deleting user: ' + err.message)
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.editingUser = null;
    this.userForm.reset({ role: 'user' });
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();
  }

  isUserOnline(userId: string): boolean {
    return this.activeUsers.some(log => log.userId === userId);
  }
}
