import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DashboardModule} from "./dashboard/dashboard.module";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
<<<<<<< HEAD
  imports: [
    BrowserModule,
    AppRoutingModule,
  
  
    
  ],
=======
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        DashboardModule,
    ],
>>>>>>> de7d1748565b5e4fe53254ce1189bebc6e950c80
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
