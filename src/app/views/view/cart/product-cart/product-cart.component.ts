import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable, of, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { I18nService } from 'src/app/services/i18n.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit, OnDestroy {

  cart: any[] = []
  total: any = 0
  isSuccess = false
  loading: boolean = false
  subscribe!: Subscription
  isAr!: boolean
  constructor(private service: CartService,
    private toastr: NgToastService,
    public translate: TranslateService,
    private translateService: I18nService,
    private crypt: CryptoService
  ) {
    if ("cart" in localStorage) {
      this.cart = JSON.parse(this.crypt.decryptData(localStorage.getItem("cart")!))
    }
  }

  ngOnInit(): void {
    this.getTotalCart()
    this.isAr = this.translateService.isCurrentLangAr();
  }
  plus(index: any) {
    this.cart[index].quantity++
    this.getTotalCart()
    localStorage.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
  }
  minus(index: any) {
    this.cart[index].quantity--
    if (this.cart[index].quantity <= 0)
      this.cart[index].quantity = 1
    this.getTotalCart()
    localStorage.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
  }
  detectChange(index: any) {
    if (this.cart[index].quantity <= 0) {
      alert("your product quantity must be at least one item!")
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'your product quantity must be at least one item!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      this.cart[index].quantity = 1
    }
    else {
      this.getTotalCart()
      localStorage.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
    }
  }
  getCartProducts() {
    if ("cart" in localStorage) {
      this.cart = JSON.parse(this.crypt.decryptData(localStorage.getItem("cart")!))
    }
  }
  getTotalCart() {
    this.total = 0
    for (let i in this.cart) {
      this.total += this.cart[i].item.price * this.cart[i].quantity
    }
  }
  clearCart() {
    this.cart = []
    this.getTotalCart()
    localStorage.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
  }
  delete(index: number) {
    this.cart.splice(index, 1)
    this.getTotalCart()
    localStorage.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
  }
  orderCartNow() {
    this.loading = true
    let cartProduct = this.cart.map(item => {
      return { productId: item.item.id, quantity: item.quantity }
    })
    let model = {
      userId: 5,
      date: new Date(),
      products: cartProduct
    }
    this.subscribe = this.service.addCart(model).subscribe({
      next: res => {
        this.toastr.success({ type: 'SUCCESS', detail: 'Your order sent successfully.', duration: 3000 })
        this.loading = false
      },
      error: err => { this.toastr.error({ type: 'ERROR', detail: err, sticky: true }) }
    })
  }
  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe()
    }
  }
}
