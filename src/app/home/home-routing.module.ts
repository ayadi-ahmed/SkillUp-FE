import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { SingleCourseComponent } from './single-course/single-course.component';

import { ContactComponent } from './home/contact/contact.component';
import { InstructorComponent } from './instructor/instructor.component';

import {PricingComponent} from "./pricing/pricing.component";
import { ChatbotComponent } from './chatbot/chatbot.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'courses',component:CoursesComponent},
  {path:'course',component:SingleCourseComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'instructors',component:InstructorComponent},
<<<<<<< HEAD
  {path:'chat',component:ChatbotComponent},
  {path:'**',component:NotFoundComponent},


=======
>>>>>>> de7d1748565b5e4fe53254ce1189bebc6e950c80
  {path:'contact',component:ContactComponent},
  {path:'pricing',component:PricingComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
