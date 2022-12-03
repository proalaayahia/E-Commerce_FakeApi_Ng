import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product.model';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl = environment.productsUrl + "products/"
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productUrl)
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.productUrl + 'categories')
  }
  // getProductByCategory(filter: string): Observable<any[]> {
  //   return this.http.get<any[]>(this.productUrl + 'category/' + filter)
  // }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.productUrl + id)
  }
}
