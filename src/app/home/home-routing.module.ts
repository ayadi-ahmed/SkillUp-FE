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
import {CheckoutAbonnementComponent} from "./checkout-abonnement/checkout-abonnement.component";
import {CandidatGuardService} from "../Authorizations/candidat-guard.service";
import {AuthenticatedGuardService} from "../Authorizations/authenticated-guard.service";
import {ManagerGuardService} from "../Authorizations/manager-guard.service";


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'courses', component: CoursesComponent},
    {path: 'course/:id', component: SingleCourseComponent},
    {path: 'checkout/:id', component: CheckoutComponent, canActivate: [CandidatGuardService]},
    {path: 'interested/:id', component: InterstedComponent, canActivate: [CandidatGuardService]},
    {path: 'thank-you', component: ThankYouComponent, canActivate: [CandidatGuardService]},
    {path: 'login', component: LoginComponent, canActivate: [AuthenticatedGuardService]},
    {path: 'signup', component: SignupComponent, canActivate: [AuthenticatedGuardService]},
    {path: 'instructors', component: InstructorComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'pricing', component: PricingComponent},
    {path: 'signup-center', component: SignupCenterComponent, canActivate: [AuthenticatedGuardService]},
    {path: 'signup-candidat', component: SignupCandidatComponent, canActivate: [AuthenticatedGuardService]},
    {path: 'checkout-abonnement', component: CheckoutAbonnementComponent, canActivate: [ManagerGuardService]},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
