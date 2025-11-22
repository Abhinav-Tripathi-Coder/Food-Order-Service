import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-shop-home',
  standalone: false,
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.scss']
})
export class ShopHomeComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;
  selectedCategory: string = 'all';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['category'] || 'all';
      const searchQuery = params['search'];
      this.loadProducts(searchQuery);
    });
  }

  loadProducts(searchQuery?: string) {
    this.loading = true;
    this.productService.list().subscribe({
      next: p => { 
        this.products = p;
        
        if (searchQuery) {
          this.products = this.products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        this.filterProducts();
        this.loading = false; 
      },
      error: () => { 
        this.loading = false; 
      }
    });
  }

  filterProducts() {
    if (this.selectedCategory === 'all') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        p => p.category?.toLowerCase() === this.selectedCategory.toLowerCase()
      );
    }
  }

  onAdd(item: Product) {
    this.cartService.add({ 
      productId: item.id, 
      name: item.name, 
      price: item.price, 
      qty: 1, 
      image: item.image 
    });
    
    alert(`${item.name} added to cart!`);
  }
}
