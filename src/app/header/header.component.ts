import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../Services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authentificationService: AuthentificationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this.authentificationService.isLoggedIn();
  }

  disconnect(){
    this.authentificationService.clear();
    this.router.navigate(['/']);
  }

}
