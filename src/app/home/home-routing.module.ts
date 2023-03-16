import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { SingleCourseComponent } from './single-course/single-course.component';
import {ContactComponent} from "./contact/contact.component";
import {PricingComponent} from "./pricing/pricing.component";

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'courses',component:CoursesComponent},
  {path:'course',component:SingleCourseComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'contact',component:ContactComponent},
  {path:'pricing',component:PricingComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }