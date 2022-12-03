import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ViewComponent } from './view/view.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AdminComponent,
    ViewComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class LayoutsModule { }
