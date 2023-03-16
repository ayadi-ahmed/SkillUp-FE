import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'dashboard',loadChildren:()=>import('./dashboard/dashboard.module').then(mod=>mod.DashboardModule)},
  {path:'',loadChildren:()=>import('./home/home.module').then(mod=>mod.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
