// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   imports: [],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss'
// })
// export class LoginComponent {

// }


// import { Component } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { AuthService } from '../../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   template: `
//   <div class="login">
//     <h2>Login</h2>
//     <form [formGroup]="f" (ngSubmit)="login()">
//       <mat-form-field appearance="fill">
//         <mat-label>Username</mat-label>
//         <input matInput formControlName="username" />
//       </mat-form-field>
//       <mat-form-field appearance="fill">
//         <mat-label>Password</mat-label>
//         <input matInput type="password" formControlName="password" />
//       </mat-form-field>
//       <button mat-raised-button color="primary" type="submit" [disabled]="f.invalid">Login</button>
//     </form>
//   </div>
//   `
// })
// export class LoginComponent {
//   f = this.fb.group({
//     username: ['', Validators.required],
//     password: ['', Validators.required]
//   });
//   constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

//   login() {
//     if (this.f.invalid) return;
//     this.auth.login(this.f.value.username, this.f.value.password).subscribe(u => {
//       this.router.navigate(['/']);
//     });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  f!: FormGroup;
  loading = false;
  errorMessage?: string;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.f = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.f.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = undefined;

    const { username, password } = this.f.value;

    this.auth.login(username, password).subscribe({
      next: user => {
        this.loading = false;
        // after login, redirect to home or whatever route
        this.router.navigate(['/']);
      },
      error: err => {
        this.loading = false;
        this.errorMessage = 'Login failed. Please check credentials.';
        console.error('Login error:', err);
      }
    });
  }
}

