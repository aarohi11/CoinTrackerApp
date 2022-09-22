import { AddressViewComponent } from './components/address-view/address-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './components/address/address.component';

const routes: Routes = [
  {path:'',component:AddressComponent},
  {path:'addressview', component: AddressViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
