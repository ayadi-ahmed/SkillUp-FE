import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Manager} from "../../../Entities/manager";
import {TrainingCenter} from "../../../Entities/training-center";
import {ManagerService} from "../../../Services/manager.service";
import {TrainingCenterService} from "../../../Services/training-center.service";
import {HttpErrorResponse} from "@angular/common/http";
import {map, Observable, startWith, Subscription} from "rxjs";
import {CategorieService} from "../../../Services/categorie.service";
import {Category} from "../../../Entities/category";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {AuthentificationService} from "../../../Services/authentification.service";

@Component({
    selector: 'app-signup-center',
    templateUrl: './signup-center.component.html',
    styleUrls: ['./signup-center.component.css']
})
export class SignupCenterComponent implements OnInit, OnDestroy {

    public image: any = {
        file: new File([], ""),
        url: ""
    }

    public profileImage: any = {
        file: new File([], ""),
        url: ""
    }

    private subscription: Subscription | undefined;
    public manager: Manager = {
        id: 0,
        email: "",
        mdp: "",
        role: null,
        nom: "",
        prenom: "",
        dateNaissance: "",
        tel: null,
        centreFormation: [],
        img: ""
    }

    public center: TrainingCenter = {
        dateCreation: "",
        description: "",
        etatDemandeInscription: null,
        logo: "",
        matriculeFiscal: "",
        adresse: "",
        email: "",
        id: 0,
        manager: null,
        nom: "",
        rib: 0,
        tel: null
    }
    public disableButton = false;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    categoryCtrl = new FormControl('');
    filteredcategories: Observable<string[]>;
    public categories: string[] = [];
    public categoriesAdded: string[] = [];
    @ViewChild('categoryInput') categoryInput!: ElementRef<HTMLInputElement>;
    private trainingCenterId: number = 0;
    public emailExists: boolean = false;

    constructor(private managerService: ManagerService,
                private trainingCenterService: TrainingCenterService,
                private categorieService: CategorieService,
                private authentificationService: AuthentificationService) {
        this.filteredcategories = this.categoryCtrl.valueChanges.pipe(
            startWith(null),
            map((category: string | null) => (category ? this._filter(category) : this.categories.slice())),
        );
    }

    ngOnInit(): void {
        this.getAllCategories();
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            const index = this.categories.indexOf(value);
            if (index >= 0) {
                this.categoriesAdded.push(value);
            }
        }
        event.chipInput!.clear();
        this.categoryCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.categoriesAdded.indexOf(fruit);

        if (index >= 0) {
            this.categoriesAdded.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.categoriesAdded.push(event.option.viewValue);
        this.categoryInput.nativeElement.value = '';
        this.categoryCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.categories.filter(category => category.toLowerCase().includes(filterValue));
    }

    getAllCategories() {
        this.categorieService.getAllCategories()
            .subscribe((response: Category[]) => {
                    this.categories = response.map(category => category.nom)
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    addCenter() {
        this.disableButton = true;
        const formationFormData = this.prepareFormData(this.center, this.image);
        const formDataManager = this.prepareFormDataManager(this.manager, this.profileImage);
        this.subscription = this.managerService.addManager(formDataManager)
            .subscribe(
                (response: Manager) => {
                    this.manager.id = response.id;
                    this.trainingCenterService.addTrainingCenter(formationFormData)
                        .subscribe(
                            (response: TrainingCenter) => {
                                this.trainingCenterId = response.id;
                                this.managerService.affectCenterToManager(response.id, this.manager.id)
                                    .subscribe((response: any) => {
                                            for (let category of this.categoriesAdded) {
                                                this.getCategoryByName(category);
                                            }
                                        },
                                        (error: HttpErrorResponse) => {
                                            console.log(error.message);
                                        });
                            },
                            (error: HttpErrorResponse) => {
                                console.log(error.message);
                            }
                        )
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    prepareFormData(centre: any, image: any): FormData {
        const formData = new FormData();
        formData.append(
            'centre',
            new Blob([JSON.stringify(centre)], {type: 'application/json'})
        );
        formData.append(
            'image',
            image.file,
            image.file.name
        );
        return formData;
    }

    prepareFormDataManager(manager: any, image: any): FormData {
        const formData = new FormData();
        formData.append(
            'manager',
            new Blob([JSON.stringify(manager)], {type: 'application/json'})
        );
        formData.append(
            'image',
            image.file,
            image.file.name
        );
        return formData;
    }

    onFileSelected(event: any) {
        if (event.target.files) {
            const file = event.target.files[0];
            this.image = {
                file: file,
                url: null
            };
        }
    }

    onFileSelectedManager(event: any) {
        if (event.target.files) {
            const file = event.target.files[0];
            this.profileImage = {
                file: file,
                url: null
            };
        }
    }

    getCategoryByName(name: string) {
        this.categorieService.getCategoryByName(name)
            .subscribe(
                (response: Category) => {
                    this.affectCategoryToCenter(response.id, this.trainingCenterId);
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    affectCategoryToCenter(categoryId: number, centerId: number) {
        this.trainingCenterService.affectCenterToCategory(categoryId, centerId)
            .subscribe(
                (response: any) => {

                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    getUserByEmail() {
        this.authentificationService.getUserByEmail(this.manager.email)
            .subscribe(
                (response: any) => {
                    if (response != null) {
                        this.emailExists = true;
                    }else {
                        this.emailExists = false;
                    }
                }, (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }
}
