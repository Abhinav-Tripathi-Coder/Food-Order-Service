import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { WishlistService } from '../../services/wishlist.service';
import { SettingsDialogComponent } from '../components/settings-dialog/settings-dialog.component';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  count$!: Observable<number>;
  wishlistCount$!: Observable<number>;
  isLoggedIn$!: Observable<boolean>;
  deliveryLocation: string = 'New Delhi';
  searchQuery: string = '';
  activeCategory: string = 'home';
  userName: string = 'User';
  isAdmin: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private wishlistService: WishlistService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.count$ = this.cartService.items$.pipe(
      map(items => items.reduce((s, i) => s + i.qty, 0))
    );
    this.wishlistCount$ = this.wishlistService.wishlist$.pipe(
      map(items => items.length)
    );
    this.isLoggedIn$ = this.authService.user$.pipe(
      map(user => !!user)
    );
    
    const savedLocation = localStorage.getItem('deliveryLocation');
    if (savedLocation) {
      this.deliveryLocation = savedLocation;
    }

    this.authService.user$.subscribe(user => {
      if (user) {
        this.userName = user.name;
        this.isAdmin = user.role === 'admin';
      } else {
        this.userName = 'User';
        this.isAdmin = false;
      }
    });
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveCategory();
    });
    
    this.updateActiveCategory();
  }

  updateActiveCategory() {
    let currentRoute = this.route.root;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    
    currentRoute.queryParams.subscribe(params => {
      if (params['category']) {
        this.activeCategory = params['category'];
      } else if (this.router.url === '/' || this.router.url.startsWith('/?')) {
        this.activeCategory = 'home';
      } else {
        this.activeCategory = '';
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/'], { 
        queryParams: { search: this.searchQuery } 
      });
    }
  }

  updateLocation(): void {
    const newLocation = prompt('Enter delivery location:', this.deliveryLocation);
    if (newLocation && newLocation.trim()) {
      this.deliveryLocation = newLocation.trim();
      localStorage.setItem('deliveryLocation', this.deliveryLocation);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {
      width: '500px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Password updated');
      }
    });
  }
}
