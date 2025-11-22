import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models';

@Component({
  selector: 'app-settings-dialog',
  standalone: false,
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
  passwordForm!: FormGroup;
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<SettingsDialogComponent>
  ) {}

  ngOnInit() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }

    const currentUser = this.authService.currentUser;
    if (!currentUser) {
      alert('User not found');
      return;
    }

    const formValue = this.passwordForm.value;

    this.authService.getAllUsers().subscribe({
      next: (users: User[]) => {
        const fullUser = users.find((u: User) => u.id === currentUser.id);
        
        if (!fullUser) {
          alert('User not found');
          return;
        }

        if (fullUser.password !== formValue.currentPassword) {
          alert('Current password is incorrect');
          return;
        }

        this.authService.updateUserProfile(currentUser.id, { 
          password: formValue.newPassword 
        }).subscribe({
          next: () => {
            alert('Password updated successfully!');
            this.dialogRef.close(true);
          },
          error: (err: Error) => {
            alert('Error updating password. Please try again.');
            console.error('Password update error:', err);
          }
        });
      },
      error: (err: Error) => {
        alert('Error verifying current password. Please try again.');
        console.error('Password verification error:', err);
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
