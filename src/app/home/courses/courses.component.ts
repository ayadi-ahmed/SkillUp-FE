import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormationService} from "../../Services/formation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {course} from "../../Entities/courses";
import {Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, map, Observable, OperatorFunction} from "rxjs";
import {CategorieService} from "../../Services/categorie.service";

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

    p:any;
    itemsPerPage: number = 5;
    categorieId: any = "";
    public categories: any[] = [];
    maxPrice: number = 0;
    minPrice: number = 0;
    value = [0, 0];
    priceSort: string = "randomPrices";
    formatter = (result: string) => result.toUpperCase();
    searchbytitle: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) =>
                term === '' ? [] : this.courseTitles.filter((f) => f.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
            ),
        );
    public formations: course[] = [];
    public courseTitles: string[] = [];
    public title: string = "";

    constructor(private formationService: FormationService,
                private router: Router,
                private categorieService: CategorieService) {
    }

    ngOnInit(): void {
        this.getAllFormations();
        this.getAllCategies();
    }

    ngOnDestroy(): void {
    }

    getAllFormations() {
        this.formationService.getAllFormations().subscribe(
            (response: course[]) => {
                this.formations = response;
                this.courseTitles = this.formations.map(f => f.titre);
                this.maxPrice = this.formations.map(course => course.prix!)
                    .reduce((acc, price) => Math.max(acc, price), 0);
                this.minPrice = this.formations.map(course => course.prix!)
                    .reduce((acc, price) => Math.min(acc, price), Infinity);
                this.value = [this.minPrice, this.maxPrice];
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    searchByTitle() {
        this.formationService.getFormationByTitle(this.title).subscribe(
            (response: course[]) => {
                this.formations = response;
                this.value = [this.minPrice, this.maxPrice];
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    randomPrices() {
        this.priceSort = "randomPrices";
        this.formations.sort(() => Math.random() - 0.5);
    }

    increasingPrices() {
        this.priceSort = "increasingPrices";
        this.formations
            .sort((a, b) => a.prix! - b.prix!);
    }

    decreasingPrices() {
        this.priceSort = "decreasingPrices";
        this.formations
            .sort((a, b) => b.prix! - a.prix!);
    }

    getDetails(courseId: number) {
        this.router.navigate(['/course'], {queryParams: {id: courseId}});
    }

    getFormationByPrixBetweenAndCategory() {
        if (this.categorieId != "") {
            this.getFormationsByPrixBetweenAndCategorie_Id(this.value[0], this.value[1], this.categorieId);
        } else {
            this.formationService.getFormationByPrixBetween(this.value[0], this.value[1])
                .subscribe(
                    (response: course[]) => {
                        this.formations = response;
                        switch (this.priceSort) {
                            case "randomPrices" :
                                this.randomPrices();
                                break;
                            case "increasingPrices":
                                this.increasingPrices();
                                break;
                            case "decreasingPrices":
                                this.decreasingPrices();
                                break;
                            default:
                                break;
                        }
                    }
                );
        }
    }

    getFormationsByPrixBetweenAndCategorie_Id(minPrice: number, maxPrice: number, categoryId: number) {
        this.formationService.getFormationsByPrixBetweenAndCategorie_Id(minPrice, maxPrice, categoryId)
            .subscribe(
                (response: any[]) => {
                    this.formations = response;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    formatPrice(value: number): string {
        return `${value} TND`;
    }

    getAllCategies() {
        this.categorieService.getAllCategories()
            .subscribe(
                (response: any[]) => {
                    this.categories = response;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }
}
