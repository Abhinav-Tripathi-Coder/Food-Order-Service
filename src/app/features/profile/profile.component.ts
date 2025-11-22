import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  currentUser: User | null = null;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    
    if (!this.currentUser) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.profileForm = this.fb.group({
      name: [this.currentUser.name || '', [Validators.required, Validators.minLength(3)]],
      username: [{value: this.currentUser.username, disabled: true}],
      phone: [this.currentUser.phone || '', [Validators.pattern(/^[0-9]{10}$/)]],
      address: [this.currentUser.address || '']
    });
  }

  onSubmit() {
    if (this.profileForm.invalid || !this.currentUser) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const updates = {
      name: this.profileForm.value.name,
      phone: this.profileForm.value.phone,
      address: this.profileForm.value.address
    };

    this.authService.updateUserProfile(this.currentUser.id, updates).subscribe({
      next: (updatedUser: User) => {
        this.loading = false;
        this.successMessage = 'Profile updated successfully!';
        this.currentUser = updatedUser;
        
        // Update local storage
        const storedUser = localStorage.getItem('fos_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          localStorage.setItem('fos_user', JSON.stringify({...user, ...updates}));
        }

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err: Error) => {
        this.loading = false;
        this.errorMessage = 'Failed to update profile. Please try again.';
        console.error('Profile update error:', err);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
