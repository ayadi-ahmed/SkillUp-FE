import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CartComponent} from "./cart/cart.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {BuyAbonnementComponent} from "./buy-abonnement/buy-abonnement.component";
import {NotFoundComponent} from "../home/not-found/not-found.component";
import {MessagesComponent} from "./messages/messages.component";

const routes: Routes = [
  {path:'', component:DashboardComponent},
  {path:'cart', component:CartComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'buy-abonnement', component:BuyAbonnementComponent},
  {path:'messages', component:MessagesComponent},
  {path:'**',component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
