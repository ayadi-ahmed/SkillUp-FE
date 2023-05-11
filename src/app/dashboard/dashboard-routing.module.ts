import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {CartComponent} from "./cart/cart.component";
import {BuyAbonnementComponent} from "./buy-abonnement/buy-abonnement.component";
import {NotFoundComponent} from "../home/not-found/not-found.component";
import {MessagesComponent} from "./messages/messages.component";
import { AddTrainingComponent } from './add-training/add-training.component';
import {ProfileComponent} from "./Profile-Training-Center/profile/profile.component";
import {AddCenterComponent} from "./Profile-Training-Center/add-center/add-center.component";
import {FavorisComponent} from "./favoris/favoris.component";
import {StatsComponent} from "./stats/stats.component";
import {CategorieComponent} from "./categorie/categorie.component";
import {TagComponent} from "./tag/tag.component";
import {TransactionsClientComponent} from "./transactions-client/transactions-client.component";
import {TransactionCenterComponent} from "./transaction-center/transaction-center.component";
import {UsersComponent} from "./users/users.component";
import {CandidatesComponent} from "./candidates/candidates.component";
import {DemmandesInscriptionComponent} from "./demmandes-inscription/demmandes-inscription.component";
import {AbonnementTransactionsComponent} from "./abonnement-transactions/abonnement-transactions.component";
import {AdminGuardService} from "../Authorizations/admin-guard.service";
import {CandidatGuardService} from "../Authorizations/candidat-guard.service";
import {ManagerGuardService} from "../Authorizations/manager-guard.service";
import {AuthenticatedGuardService} from "../Authorizations/authenticated-guard.service";
import {ProfileGuardService} from "../Authorizations/profile-guard.service";

const routes: Routes = [
  {path:'', component:DashboardComponent,
    children: [
      {path:'users', component:UsersComponent, canActivate: [AdminGuardService]},
      {path:'candidates', component:CandidatesComponent, canActivate: [AdminGuardService]},
      {path:'demandes', component:DemmandesInscriptionComponent, canActivate: [AdminGuardService]},
      {path:'abonnements', component:AbonnementTransactionsComponent, canActivate: [AdminGuardService]},
      //{path:'cart', component:CartComponent},
      //{path:'buy-abonnement', component:BuyAbonnementComponent},
      //{path:'messages', component:MessagesComponent},
      {path:'add-training', component:AddTrainingComponent, canActivate: [ManagerGuardService]},
      {path:'add-center', component:AddCenterComponent, canActivate: [ManagerGuardService]},
      //{path:'favoris', component:FavorisComponent},
      {path:'transactions', component:TransactionsClientComponent, canActivate: [CandidatGuardService]},
      {path:'transactions-center', component:TransactionCenterComponent, canActivate: [ManagerGuardService]},
      {path:'profile', component:ProfileComponent, canActivate: [ProfileGuardService]},
      //{path:'settings', component:ProfileComponent},
      {path:'stats', component:StatsComponent, canActivate: [AdminGuardService]},
      {path:'categories', component:CategorieComponent, canActivate: [AdminGuardService]},
      {path:'tag', component:TagComponent, canActivate: [AdminGuardService]},
    ]},
  {path:'**',component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
