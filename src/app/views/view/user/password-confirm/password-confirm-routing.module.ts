import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordConfirmComponent } from './password-confirm.component';

const routes: Routes = [
  { path: '', component: PasswordConfirmComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordConfirmRoutingModule { }
