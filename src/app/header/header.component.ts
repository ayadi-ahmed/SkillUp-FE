import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../Services/authentification.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {CategorieService} from "../Services/categorie.service";
import {Category} from "../Entities/category";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public categories: Category[] = [];
  constructor(private authentificationService: AuthentificationService,
              private router: Router,
              private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.getAllCategories();
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
