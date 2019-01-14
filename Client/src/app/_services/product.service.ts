import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Product } from '@app/_models';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }
  getAll() {
    return this.http.get(`${environment.apiUrl}/products`);
  }

  getById(id: string) {
    return this.http.get(`${environment.apiUrl}/products/${id}`);
  }
      update(product: Product) {
        return this.http.patch(`${environment.apiUrl}/users/${product.id}`, product);
    }
  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/products/${id}`);
}
}
