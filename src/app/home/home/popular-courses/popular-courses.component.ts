import { Component, OnInit } from '@angular/core';
import {FormationService} from "../../../Services/formation.service";
import {course} from "../../../Entities/courses";
import {HttpErrorResponse} from "@angular/common/http";
import {CategorieService} from "../../../Services/categorie.service";
import {Category} from "../../../Entities/category";

@Component({
  selector: 'app-popular-courses',
  templateUrl: './popular-courses.component.html',
  styleUrls: ['./popular-courses.component.css']
})
export class PopularCoursesComponent implements OnInit {

  public formations: any[] = [];
  public categories: Category[] =[];
  constructor(private formationService: FormationService,
              private categorieService: CategorieService) { }

  ngOnInit(): void {
    // this.findFirst10ByOrderByIdDesc();
    this.getAllCategories();
  }

  findFirst10ByOrderByIdDesc(){
    this.formationService.findFirst10ByOrderByIdDesc()
        .subscribe(
            (response: any) => {
              this.formations = response;
            },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            }
        )
  }

    findFirst10ByCategorie_NomOrderByIdDesc(categoryName: string){
      this.formationService.findFirst10ByCategorie_NomOrderByIdDesc(categoryName)
          .subscribe(
              (response: any) => {
                  this.formations = response;
              },
              (error: HttpErrorResponse) => {
                  console.log(error.message);
              }
          )
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

}
