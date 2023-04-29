import { Component, OnInit } from '@angular/core';
import {CategorieService} from "../../../Services/categorie.service";
import {Category} from "../../../Entities/category";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent implements OnInit {

  public categories: Category[] = [];
  constructor(private categorieService: CategorieService,
              private router: Router) { }

  ngOnInit(): void {
      this.getAllCategories();
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
