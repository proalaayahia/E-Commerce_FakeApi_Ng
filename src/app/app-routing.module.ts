import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layouts/admin/admin.component';
import { ViewComponent } from './layouts/view/view.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '', component: ViewComponent, children:
      [
        { path: '', loadChildren: () => import('./views/view/home/home.module').then(m => m.HomeModule) },
        { path: 'products', loadChildren: () => import('./views/view/product/products/products.module').then(m => m.ProductsModule) },
        { path: 'details/:id', loadChildren: () => import('./views/view/product/details/details.module').then(m => m.DetailsModule) },
        { path: 'cart', loadChildren: () => import('./views/view/cart/product-cart/product-cart.module').then(m => m.ProductCartModule) },
        { path: 'login', loadChildren: () => import('./views/view/user/login/login.module').then(m => m.LoginModule) },
        { path: 'register', loadChildren: () => import('./views/view/user/register/register.module').then(m => m.RegisterModule) },
        { path: 'confirm-register', loadChildren: () => import('./views/view/user/register-confirm/register-confirm.module').then(m => m.RegisterConfirmModule) },
        { path: 'confirm-password', loadChildren: () => import('./views/view/user/password-confirm/password-confirm.module').then(m => m.PasswordConfirmModule) },
        { path: 'forget-password', loadChildren: () => import('./views/view/user/forget-password/forget-password.module').then(m => m.ForgetPasswordModule) }
      ]
  },
  {
    path: 'admin', component: AdminComponent, children:
      [
        { path: '', pathMatch: 'full', loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'dashboard', loadChildren: () => import('./views/admin/dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'products', loadChildren: () => import('./views/admin/product/products/products.module').then(m => m.ProductsModule) }
      ]
  },
  { path: '**', component: NotFoundComponent, title: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
