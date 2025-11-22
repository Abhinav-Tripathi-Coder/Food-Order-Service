// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   title = 'food-order-service';
// }



import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  cartCount$: Observable<number>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.cartCount$ = this.cartService.items$.pipe(
      map(items => items.reduce((sum, i) => sum + i.qty, 0))
    );
    this.isLoggedIn$ = this.authService.user$.pipe(
      map(user => !!user)
    );
  }

  logout(): void {
    this.authService.logout();
  }
}
