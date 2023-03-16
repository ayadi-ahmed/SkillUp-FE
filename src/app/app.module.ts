import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { HeaderComponent } from './home/home/header/header.component';
import { FooterComponent } from './home/home/footer/footer.component';


=======
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
>>>>>>> 4e0277de8419b19c2ce854cc7a273d4aebfe66a9

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
<<<<<<< HEAD
    FooterComponent,
=======
    FooterComponent
>>>>>>> 4e0277de8419b19c2ce854cc7a273d4aebfe66a9
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
