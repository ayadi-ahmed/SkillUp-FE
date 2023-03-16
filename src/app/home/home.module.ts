import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './home/banner/banner.component';
import { FeaturesComponent } from './home/features/features.component';
import { CourseCategoryComponent } from './home/course-category/course-category.component';
import { StatsComponent } from './home/stats/stats.component';
import { PopularCoursesComponent } from './home/popular-courses/popular-courses.component';
import { SmallBannerComponent } from './home/small-banner/small-banner.component';
import { HowItWorksComponent } from './home/how-it-works/how-it-works.component';
import { TestimonialsComponent } from './home/testimonials/testimonials.component';
import { BecomePartnerComponent } from './home/become-partner/become-partner.component';
import { CoursesComponent } from './courses/courses.component';
import { SingleCourseComponent } from './single-course/single-course.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
<<<<<<< HEAD
import { ContactComponent } from './home/contact/contact.component';
import { InstructorComponent } from './instructor/instructor.component';
=======
import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
>>>>>>> 4e0277de8419b19c2ce854cc7a273d4aebfe66a9


@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    FeaturesComponent,
    CourseCategoryComponent,
    StatsComponent,
    PopularCoursesComponent,
    SmallBannerComponent,
    HowItWorksComponent,
    TestimonialsComponent,
    BecomePartnerComponent,
    CoursesComponent,
    SingleCourseComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    ContactComponent,
<<<<<<< HEAD
    InstructorComponent,
=======
    PricingComponent
>>>>>>> 4e0277de8419b19c2ce854cc7a273d4aebfe66a9
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
