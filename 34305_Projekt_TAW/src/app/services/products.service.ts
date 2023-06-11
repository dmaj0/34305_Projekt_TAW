import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  id: string;
  title: string;
  image: string;
  description: string;
  author: string;
}

@Injectable()
export class ProductsService {
  
  private API_URL = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }
  
  addProduct(newProduct: Product): Observable<any> {
    return this.http.post<any>(this.API_URL, newProduct);
  }
  
  deleteProduct(id: string): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.delete<any>(url);
  }
  
  updateProduct(id: string, product: Product): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.put<any>(url, product);
  }
}
