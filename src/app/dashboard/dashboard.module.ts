import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CartComponent} from './cart/cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {BuyAbonnementComponent} from './buy-abonnement/buy-abonnement.component';
import {MessagesComponent} from './messages/messages.component';
import {AddTrainingComponent} from './add-training/add-training.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from "@angular/material/sidenav";
import {ProfileComponent} from './Profile-Training-Center/profile/profile.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {InstructorsComponent} from './Profile-Training-Center/instructors/instructors.component';
import {CenterCoursesComponent} from './Profile-Training-Center/center-courses/center-courses.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { AddCenterComponent } from './Profile-Training-Center/add-center/add-center.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FavorisComponent } from './favoris/favoris.component';
import { SettingsComponent } from './settings/settings.component';
import { StatsComponent } from './stats/stats.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [
        DashboardComponent,
        CartComponent,
        CheckoutComponent,
        BuyAbonnementComponent,
        MessagesComponent,
        ProfileComponent,
        InstructorsComponent,
        CenterCoursesComponent,
        AddTrainingComponent,
        AddCenterComponent,
        SidebarComponent,
        FavorisComponent,
        SettingsComponent,
        StatsComponent,
        HeaderComponent,
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatSidenavModule,
        MatTabsModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule
    ]
})
export class DashboardModule {
}
