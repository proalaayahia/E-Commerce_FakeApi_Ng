import { Component, DoCheck } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CryptoService } from '../services/crypto.service';
import { I18nService } from '../services/i18n.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements DoCheck {
  cart!: any[]
  isClick: boolean = false
  current!: string
  links = [
    { route: '', icon: 'home', text: 'Home' },
    { route: '', icon: 'apps', text: 'Services' },
    { route: 'products', icon: 'category', text: 'Products' },
    { route: '', icon: 'stay_primary_portrait', text: 'Contact' },
    { route: '', icon: 'settings', text: 'Settings' }
  ]
  constructor(public translate: TranslateService, private service: I18nService, private crypt: CryptoService) { }

  ngDoCheck() {
    if ("cart" in localStorage) {
      this.cart = JSON.parse(this.crypt.decryptData(localStorage.getItem("cart")!))
    }
    if ("lang" in localStorage) {
      this.current = localStorage.getItem("lang")!
      this.service.changeLocal(this.current || 'en');
      this.current === 'ar' ? this.isClick = true : this.isClick = false
    }
  }
  langChange(event: any) {
    this.isClick = !this.isClick;
    // (this.isClick == true) ? this.service.changeLocal('ar') : this.service.changeLocal('en')
    this.checkToAddLocal(event, this.isClick)
  }
  checkToAddLocal(event: any, isClick: boolean) {
    if (event) {
      if (isClick) {
        if ("lang" in localStorage) {
          this.service.changeLocal('ar')
          localStorage.removeItem("lang")
          localStorage.setItem("lang", 'ar')
        }
        else {
          this.service.changeLocal('ar')
          localStorage.setItem("lang", 'ar')
        }
      }
      else {
        if ("lang" in localStorage) {
          this.service.changeLocal('en')
          localStorage.removeItem("lang")
          localStorage.setItem("lang", 'en')
        }
        else {
          this.service.changeLocal('en')
          localStorage.setItem("lang", 'en')
        }
      }
    }
  }
}
