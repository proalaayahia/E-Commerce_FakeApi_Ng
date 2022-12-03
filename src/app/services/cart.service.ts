import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url = environment.productsUrl
  constructor(private http: HttpClient) {
  }
  addCart(model: any) {
    return this.http.post(this.url + 'carts', model)
  }
}
