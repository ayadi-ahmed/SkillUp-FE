import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormationService} from "../../Services/formation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {course} from "../../Entities/courses";
import {ActivatedRoute, Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, map, Observable, OperatorFunction} from "rxjs";
import {CategorieService} from "../../Services/categorie.service";
import {TagService} from "../../Services/tag.service";
import {Tag} from "../../Entities/tag";
import {Category} from "../../Entities/category";

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

    p: any;
    itemsPerPage: number = 6;
    categorieId: any = "";
    public categories: any[] = [];
    maxPrice: number = 0;
    minPrice: number = 0;
    value = [0, 0];
    priceSort: string = "randomPrices";
    formatter = (result: string) => result.toUpperCase();
    searchbyTagOrTitle: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) =>
                term === '' ? [] : this.courseTagsTitle.filter((t) => t.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
            ),
        );
    public formations: course[] = [];
    public courseTagsTitle: string[] = [];
    public tagOrTitle: any = "";
    public category: any = "";

    constructor(private formationService: FormationService,
                private router: Router,
                private categorieService: CategorieService,
                private tagService: TagService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(queryParams => {
            this.category = queryParams.get('category');
            this.tagOrTitle = queryParams.get('searchBy');
            this.getAllFormations();
            if (this.tagOrTitle!="") {
                this.searchByTagOrTitle();
            } else if (this.category!="") {
                this.getCategoryByName();
                this.getAllFormationsByCategory();
            }
        });
        this.getAllCategories();
        this.getAllTags();
    }

    ngOnDestroy(): void {
    }

    getAllFormations() {
        this.formationService.getAllCoursesForValidateAbonnement().subscribe(
            (response: course[]) => {
                if (this.category == '' && this.tagOrTitle == '' && this.categorieId == '') {
                    this.formations = response;
                }
                response.forEach(formation => {
                    if (!this.courseTagsTitle.includes(formation.titre.toUpperCase())) {
                        this.courseTagsTitle.push(formation.titre.toUpperCase());
                    }
                });
                this.maxPrice = response.map(course => course.prix!)
                    .reduce((acc, price) => Math.max(acc, price), 0);
                this.minPrice = response.map(course => course.prix!)
                    .reduce((acc, price) => Math.min(acc, price), Infinity);
                this.value = [this.minPrice, this.maxPrice];
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    searchByTagOrTitle() {
        this.formationService.getFormationByTagOrTitle(this.tagOrTitle).subscribe(
            (response: course[]) => {
                this.formations = response;
                this.value = [this.minPrice, this.maxPrice];
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    getAllTags() {
        this.tagService.getAllTags()
            .subscribe(
                (response: Tag[]) => {
                    response.forEach(tag => {
                        if (!this.courseTagsTitle.includes(tag.nom.toUpperCase())) {
                            this.courseTagsTitle.push(tag.nom.toUpperCase());
                        }
                    });
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
        this.router.navigate([`/course/${courseId}`]);
    }

    getFormationByPrixBetweenAndCategory() {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {category: '', searchBy: ''},
            queryParamsHandling: 'merge'
        });
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

    getAllCategories() {
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

    getAllFormationsByCategory() {
        this.formationService.getAllFormationsByCategoryName(this.category)
            .subscribe(
                (response: any) => {
                    this.formations = response;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    getCategoryByName() {
        this.categorieService.getCategoryByName(this.category).subscribe(
            (response: Category) => {
                this.categorieId = response.id;
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }
}
