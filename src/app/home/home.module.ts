import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { InstructorComponent } from './instructor/instructor.component';

import { ContactComponent } from './contact/contact.component';
import { PricingComponent } from './pricing/pricing.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
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

    InstructorComponent,

    PricingComponent,
      ChatbotComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatInputModule,
    MatIconModule
  ]
})
export class HomeModule { }
