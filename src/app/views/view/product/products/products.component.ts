import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import * as $ from 'jquery';
import { fadeAnimtion } from 'src/app/core/animations/fade.animation';
import { TranslateService } from '@ngx-translate/core';
import { I18nService } from 'src/app/services/i18n.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [fadeAnimtion]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductModel[] = null!
  categories$: Observable<string[]> = null!
  cart: any[] = []
  isLoading: boolean = false
  isAdded: boolean = false
  subscribe!: Subscription
  //**********pagination*********** */
  page: number = 1
  itemsPerPage: number = 20
  isPaging!: boolean
  isAr: boolean = false
  paginateConfig: any = { itemsPerPage: this.itemsPerPage, currentPage: 1 }
  constructor(private service: ProductService,
    public translate: TranslateService,
    private crypt: CryptoService,
    private tranlateService: I18nService,
    private toastService: NgToastService
  ) {
    this.getAllProducts()
    this.getAllCategories()
  }
  ngOnInit(): void {
    this.isPaging = (this.products?.length != undefined)
    this.paginateConfig = {
      id: 'basicPaginate',
      itemsPerPage: this.itemsPerPage,
      currentPage: 1,
      totalItems: this.products?.length
    }
    this.subscribe = this.tranlateService.localEvent.subscribe({
      next: (res) => {
        this.translate.use(res);
        (res === 'ar') ? this.isAr = true : this.isAr = false
      },
      error: err => console.log("something went error :( " + err)
    })
  }
  getAllProducts() {
    this.isLoading = true;
    this.subscribe = this.service.getProducts().subscribe({
      next: (res) => {
        this.products = res
        this.isLoading = false
      }, error: err => console.log("something went error. " + err)
    });
  }

  getAllCategories() {
    this.categories$ = this.service.getCategories()
  }

  filterCat(event: any) {
    let value = event;
    (value === 'all') ? this.getAllProducts() : this.getCategory(value);
  }

  getCategory(str: string) {
    let url = 'https://fakestoreapi.com/products/category/' + str
    $.ajax({
      method: 'GET',
      url: url,
      success: (res) => {
        this.products = res
      },
      error: err => console.log(err)
    })
  }
  addToCart(event: any) {
    if ("cart" in localStorage) {
      this.cart = JSON.parse(this.crypt.decryptData(localStorage.getItem("cart")!))
      let exist = this.cart.find(item => item.item.id == event.item.id)
      if (exist) {
        this.toastService.error({ detail: "ERROR", summary: event.item.title, sticky: true })
      }
      else {
        this.cart.push(event)
        localStorage.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
        this.toastService.success({ detail: "SUCCESS", summary: 'Item Added To Cart Successfully.', duration: 5000 })
      }
    }
    else {
      this.cart.push(event)
      localStorage.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
      this.toastService.success({ detail: "SUCCESS", summary: 'Item Added To Cart Successfully.', duration: 5000 })
    }
  }
  paging(pageNum: number) {
    this.paginateConfig.currentPage = pageNum
  }
  ngOnDestroy(): void {
    if (this.subscribe)
      this.subscribe.unsubscribe()
  }
}
