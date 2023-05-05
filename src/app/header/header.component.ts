import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../Services/authentification.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {CategorieService} from "../Services/categorie.service";
import {Category} from "../Entities/category";
import {CandidatService} from "../Services/candidat.service";
import {ManagerService} from "../Services/manager.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: any;
  public categories: Category[] = [];
  public role: string = "";
  constructor(private authentificationService: AuthentificationService,
              private router: Router,
              private categorieService: CategorieService,
              private candidatService: CandidatService,
              private managerService: ManagerService) { }

  ngOnInit(): void {
    this.role = this.authentificationService.getRole();
    this.getAllCategories();
    this.getUserConnected();
  }

  getUserConnected(){
    if (this.authentificationService.getRole() == 'CANDIDAT'){
      this.getCandidatById();
    }else if (this.authentificationService.getRole() == 'MANAGER'){
      this.getManagerById();
    }
  }
  getManagerById(){
    this.managerService.getManagerById(this.authentificationService.getUserId())
        .subscribe(value => this.user = value)
  }
  getCandidatById(){
    this.candidatService.getCandidatById(this.authentificationService.getUserId())
        .subscribe(value => this.user = value)
  }
  isLoggedIn(){
    return this.authentificationService.isLoggedIn();
  }

  disconnect(){
    this.authentificationService.clear();
    this.router.navigate(['/']);
  }

  getAllCategories(){
    this.categorieService.getAllCategories()
        .subscribe(
            (response: any) => {
              this.categories = response.filter((category: any) => category.formations.length > 0);
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
        )
  }

  search(categoryName: string) {
    this.router.navigate(['/courses'], {queryParams: {category: categoryName, searchBy: ''}});
  }
}
