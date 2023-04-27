import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoursesComponent} from './courses/courses.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SignupComponent} from './sign-up/signup/signup.component';
import {SingleCourseComponent} from './single-course/single-course.component';
import {ContactComponent} from './home/contact/contact.component';
import {InstructorComponent} from './instructor/instructor.component';
import {PricingComponent} from "./pricing/pricing.component";
import {SignupCenterComponent} from "./sign-up/signup-center/signup-center.component";
import {SignupCandidatComponent} from "./sign-up/signup-candidat/signup-candidat.component";
import {CheckoutComponent} from "./checkout/checkout.component";
import {InterstedComponent} from "./intersted/intersted.component";
import {ThankYouComponent} from "./thank-you/thank-you.component";


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'courses', component: CoursesComponent},
    {path: 'course/:id', component: SingleCourseComponent},
    {path: 'checkout/:id', component: CheckoutComponent},
    {path: 'interested/:id', component: InterstedComponent},
    {path: 'thank-you', component: ThankYouComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'instructors', component: InstructorComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'pricing', component: PricingComponent},
    {path: 'signup-center', component: SignupCenterComponent},
    {path: 'signup-candidat', component: SignupCandidatComponent},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
