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
}
