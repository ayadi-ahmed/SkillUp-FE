import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BuyAbonnementComponent } from './buy-abonnement/buy-abonnement.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CartComponent,
    CheckoutComponent,
    BuyAbonnementComponent,
    MessagesComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
