import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterConfirmComponent } from './register-confirm.component';

const routes: Routes = [
  { path: '', component: RegisterConfirmComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterConfirmRoutingModule { }
