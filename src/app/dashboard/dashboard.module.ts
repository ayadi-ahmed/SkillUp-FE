import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BuyAbonnementComponent } from './buy-abonnement/buy-abonnement.component';
import { MessagesComponent } from './messages/messages.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    CartComponent,
    CheckoutComponent,
    BuyAbonnementComponent,
    MessagesComponent,
    AddTrainingComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class DashboardModule { }
