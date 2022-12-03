import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  links = [
    { route: 'dashboard', icon: 'dashboard', text: 'Dashboard' },
    { route: 'users', icon: 'people', text: 'User' },
    { route: 'products', icon: 'category', text: 'Product' },
    { route: 'sales', icon: 'local_atm', text: 'Sales' }
  ]
  constructor() { }

  ngOnInit(): void {
  }
}
