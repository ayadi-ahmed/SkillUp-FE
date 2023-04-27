import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {course} from 'src/app/Entities/courses';
import {FormationService} from 'src/app/Services/formation.service';
import {HttpErrorResponse} from "@angular/common/http";
import {AuthentificationService} from "../../Services/authentification.service";
import {TrainingCenterService} from "../../Services/training-center.service";
import {map, Observable, startWith, Subscription} from "rxjs";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {SeanceService} from "../../Services/seance.service";
import {Seance} from "../../Entities/Seance";
import {CategorieService} from "../../Services/categorie.service";
import {TagService} from "../../Services/tag.service";
import {Tag} from "../../Entities/tag";
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatDialog} from "@angular/material/dialog";
import {DeleteTrainingComponent} from "../delete-training/delete-training.component";
import {UpdateTrainingComponent} from "../update-training/update-training.component";

@Component({
    selector: 'app-add-training',
    templateUrl: './add-training.component.html',
    styleUrls: ['./add-training.component.css']
})
export class AddTrainingComponent implements OnInit, OnDestroy {
    form!: FormGroup;

    public formation: any = {
        id: 0,
        description: '',
        titre: '',
        img: '',
        dateDebut: '',
        dateFin: '',
        prix: null,
        offres:[],
        nbMaxCan: null
    }
    public image: any = {
        file: new File([], ""),
        url: ""
    }

    public categories: any[] = [];
    public categorieId: any = "";
    public centers: any[] = [];
    public centerId: any = "";
    private subscription1: Subscription | undefined;
    private subscription2: Subscription | undefined;
    public tags: string[] = [];
    public tagsAdded: string[] = [];
    public disableAddButton: boolean = false;


    separatorKeysCodes: number[] = [ENTER, COMMA];
    tagCtrl = new FormControl('');
    filteredTags: Observable<string[]>;

    @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;


    constructor(private formationservice: FormationService,
                private router: Router,
                private authentificationService: AuthentificationService,
                private trainingCenterService: TrainingCenterService,
                private seanceService: SeanceService,
                private categorieService: CategorieService,
                private tagService: TagService,
                public dialog: MatDialog) {
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) => (tag ? this._filter(tag) : this.tags.slice())),
        );
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            const index = this.tags.indexOf(value);
            if (index >= 0) {
                this.tagsAdded.push(value);
            }
        }
        event.chipInput!.clear();
        this.tagCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.tagsAdded.indexOf(fruit);

        if (index >= 0) {
            this.tagsAdded.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.tagsAdded.push(event.option.viewValue);
        this.tagInput.nativeElement.value = '';
        this.tagCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.tags.filter(tag => tag.toLowerCase().includes(filterValue));
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            session: new FormArray([
                new FormGroup({
                    date: new FormControl(''),
                    heureDebut: new FormControl(''),
                    heureFin: new FormControl('')
                })
            ])
        });
        this.getCentersByManagerId();
        this.getAllCategories();
        this.getAllTags();
    }

    get session(): FormArray {
        return this.form.get('session') as FormArray;
    }

    addSession() {
        this.session.push(
            new FormGroup({
                date: new FormControl(''),
                heureDebut: new FormControl(''),
                heureFin: new FormControl('')
            })
        );
    }

    getCentersByManagerId() {
        this.subscription1 = this.trainingCenterService.getAllByManagerId(this.authentificationService.getUserId())
            .subscribe(
                (response: any) => {
                    this.centers = response;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    getAllCategories() {
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

    addFormation() {
        this.disableAddButton = true;
        const formationFormData = this.prepareFormData(this.formation, this.image)
        this.subscription2 = this.formationservice.addFormation(formationFormData)
            .subscribe(
                (response: course) => {
                    for (let s of this.form.value.session) {
                        let seance = {
                            id: 0,
                            date: s.date,
                            heureDebut: s.heureDebut,
                            heureFin: s.heureFin
                        }
                        this.addSeance(seance, response.id);
                    }
                    for (let tag of this.tagsAdded) {
                        this.getTagByName(tag, response.id);
                    }
                    this.affectFormationToCenter(response.id);
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                });
    }

    prepareFormData(formation: any, image: any): FormData {
        const formData = new FormData();
        formData.append(
            'formation',
            new Blob([JSON.stringify(formation)], {type: 'application/json'})
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

    addSeance(seance: Seance, formationId: number) {
        this.seanceService.addSeance(seance).subscribe(
            (response: Seance) => {
                this.formationservice.affectSeanceToFormation(response.id, formationId).subscribe();
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    affectFormationToCenter(formationId: number) {
        this.trainingCenterService.affectFormationToCenter(formationId, this.centerId)
            .subscribe(
                (response: any) => {
                    this.affectFormationToCategory(formationId);
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    affectFormationToCategory(formationId: number) {
        this.categorieService.affectFormationToCategory(formationId, this.categorieId)
            .subscribe(
                (response: any) => {
                    window.location.reload();
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    ngOnDestroy(): void {
        if (this.subscription1) {
            this.subscription1.unsubscribe();
        }
        if (this.subscription2) {
            this.subscription2.unsubscribe();
        }
    }

    getDetails(courseId: number) {
        this.router.navigate(['/course'], {queryParams: {id: courseId}});
    }

    getAllTags() {
        this.tagService.getAllTags()
            .subscribe(
                (response: Tag[]) => {
                    this.tags = response.map(t => t.nom);
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    getTagByName(name: string, trainingId: number) {
        this.tagService.getTagByName(name)
            .subscribe(
                (response: Tag) => {
                    this.affectTagToTraining(trainingId, response.id);
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    affectTagToTraining(trainingId: number, tagId: number) {
        this.tagService.affectFormationToTag(trainingId, tagId)
            .subscribe(
                (response: any) => {

                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    deleteTraining(trainingId: number) {
        this.dialog.open(DeleteTrainingComponent, {
            data: {
                id: trainingId
            },
        })
    }

    openDialogUpdateTraining(training: course) {
        this.dialog.open(UpdateTrainingComponent, {
            data: {
                course: training,
            },
            width: '100%',
            height : '90vh'
        });
    }
}
