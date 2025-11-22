// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  base = '/api/products';

  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base);
  }

  get(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  // admin operations
  create(p: Partial<Product>) {
    return this.http.post<Product>(this.base, p);
  }
  update(id: string, p: Partial<Product>) {
    return this.http.put<Product>(`${this.base}/${id}`, p);
  }
  delete(id: string) {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
