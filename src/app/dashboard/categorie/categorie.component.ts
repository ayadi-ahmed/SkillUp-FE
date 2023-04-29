import {Component, OnInit} from '@angular/core';
import {Category} from "../../Entities/category";
import {CategorieService} from "../../Services/categorie.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-categorie',
    templateUrl: './categorie.component.html',
    styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

    public categorie: Category = {
        formations: [],
        id: 0,
        nom: ""
    }

    constructor(private categorieService: CategorieService) {
    }

    ngOnInit(): void {
    }

    addNewCategory() {
        this.categorieService.addCategory(this.categorie)
            .subscribe(
                (response: any) => {
                    window.location.reload();
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    add() {
        this.categorieService.getCategoryByName(this.categorie.nom)
            .subscribe(
                (response) => {
                    if (response != null) {
                        alert('Tag already exists');
                    } else {
                        this.addNewCategory();
                    }
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }
}
