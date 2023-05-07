import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {CartComponent} from './cart/cart.component';
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
import {AddCenterComponent} from './Profile-Training-Center/add-center/add-center.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FavorisComponent} from './favoris/favoris.component';
import {SettingsComponent} from './settings/settings.component';
import {StatsComponent} from './stats/stats.component';
import {HeaderComponent} from './header/header.component';
import {CategorieComponent} from './categorie/categorie.component';
import {TagComponent} from './tag/tag.component';
import {MatStepperModule} from "@angular/material/stepper";
import {NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NzButtonModule} from "ng-zorro-antd/button";
import {DeleteTrainingComponent} from './delete-training/delete-training.component';
import {MatDialogModule} from "@angular/material/dialog";
import {TransactionsClientComponent} from './transactions-client/transactions-client.component';
import {UpdateTrainingComponent} from './update-training/update-training.component';
import {TransactionCenterComponent} from './transaction-center/transaction-center.component';
import {UsersComponent} from './users/users.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {CandidatesComponent} from './candidates/candidates.component';
import {DemmandesInscriptionComponent} from './demmandes-inscription/demmandes-inscription.component';
import {MatMenuModule} from "@angular/material/menu";
import {AbonnementTransactionsComponent} from './abonnement-transactions/abonnement-transactions.component';
import { UpdateCenterComponent } from './Profile-Training-Center/update-center/update-center.component';
import { AreaChartsComponent } from './stats/area-charts/area-charts.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { PieChartsComponent } from './stats/pie-charts/pie-charts.component';


@NgModule({
    declarations: [
        DashboardComponent,
        CartComponent,
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
        CategorieComponent,
        TagComponent,
        DeleteTrainingComponent,
        TransactionsClientComponent,
        UpdateTrainingComponent,
        TransactionCenterComponent,
        UsersComponent,
        CandidatesComponent,
        DemmandesInscriptionComponent,
        AbonnementTransactionsComponent,
        UpdateCenterComponent,
        AreaChartsComponent,
        PieChartsComponent,
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
        MatTooltipModule,
        MatStepperModule,
        NgbTypeaheadModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        NzButtonModule,
        MatDialogModule,
        NgOptimizedImage,
        MatPaginatorModule,
        MatTableModule,
        MatMenuModule,
        NgApexchartsModule,
    ]
})
export class DashboardModule {
}
