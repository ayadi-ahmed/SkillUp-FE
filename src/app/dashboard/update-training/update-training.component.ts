import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {CategorieService} from "../../Services/categorie.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Tag} from "../../Entities/tag";
import {TagService} from "../../Services/tag.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {FormationService} from "../../Services/formation.service";
import {Category} from "../../Entities/category";
import {SeanceService} from "../../Services/seance.service";
import {Seance} from "../../Entities/Seance";

@Component({
    selector: 'app-update-training',
    templateUrl: './update-training.component.html',
    styleUrls: ['./update-training.component.css']
})
export class UpdateTrainingComponent implements OnInit {
    form!: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private categorieService: CategorieService,
                private tagService: TagService,
                private formationService: FormationService,
                private seanceService: SeanceService) {
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) => (tag ? this._filter(tag) : this.tags.slice())),
        );
    }

    public categorieFormation: Category = {
        formations: [], id: 0, nom: ""

    };
    public categories: Category[] = [];
    public categorieId: any = "";
    public image: any = {
        file: new File([], ""),
        url: ""
    }
    tagCtrl = new FormControl('');
    separatorKeysCodes: number[] = [ENTER, COMMA];
    public tagsAdded: string[] = [];
    public tags: string[] = [];
    @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
    filteredTags: Observable<string[]>;
    imageUrl: string = "";
    public inputTags: boolean = false;
    public disableButton = false;

    ngOnInit(): void {
        this.getAllCategories();
        this.getAllTags();
        this.tagsAdded = this.data.course.tags.map((t: { nom: any; }) => t.nom);
        this.getCategorieByFormationId();

        this.form = new FormGroup({
            session: new FormArray([
                new FormGroup({
                    id: new FormControl(this.data.course.seances[0].id),
                    date: new FormControl(this.data.course.seances[0].date),
                    heureDebut: new FormControl(this.data.course.seances[0].heureDebut),
                    heureFin: new FormControl(this.data.course.seances[0].heureFin)
                })
            ])
        });
        for (let session of this.data.course.seances.slice(1)) {
            this.session.push(
                new FormGroup({
                    id: new FormControl(session.id),
                    date: new FormControl(session.date),
                    heureDebut: new FormControl(session.heureDebut),
                    heureFin: new FormControl(session.heureFin)
                })
            );
        }
    }


    get session(): FormArray {
        return this.form.get('session') as FormArray;
    }

    addSession() {
        this.session.push(
            new FormGroup({
                id: new FormControl(0),
                date: new FormControl(''),
                heureDebut: new FormControl(''),
                heureFin: new FormControl('')
            })
        );
    }

    removeSession(index: number) {
        this.session.removeAt(index);
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

    onFileSelected(event: any) {
        if (event.target.files) {
            const file = event.target.files[0];
            this.image = {
                file: file,
                url: null
            };
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.imageUrl = reader.result as string;
            };
        }
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

    addTags() {
        this.inputTags = !this.inputTags;
    }

    saveChanges() {
        this.disableButton = true;
        const formationFormData = this.prepareFormData(this.data.course, this.image)
        this.formationService.updateFormation(formationFormData).subscribe(
            (response: any) => {
                if (this.categorieId != "") {
                    this.affectFormationToCategory(this.data.course.id);
                }
                for (let tag of this.tagsAdded) {
                    if (!this.data.course.tags.some((item: Tag) => item.nom === tag)) {
                        this.getTagByName(tag, this.data.course.id);
                    }
                }
                for (let tag of this.data.course.tags) {
                    if (!this.tagsAdded.includes(tag.nom)) {
                        this.formationService.removeTagFromFormation(this.data.course.id, tag.id).subscribe();
                    }
                }
                for (let session of this.form.value.session){
                    if (this.data.course.seances.some((seance: { id: any; }) => seance.id === session.id)){
                        this.updateSeance(session);
                    }else {
                        this.addSeance(session);
                    }
                }
                for (let session of this.data.course.seances){
                    if (!this.form.value.session.some((seance: { id: any; }) => seance.id === session.id)){
                        this.deleteSeance(session.id);
                    }
                }
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        );
    }

    prepareFormData(formation: any, image: any): FormData {
        formation.avis = [];
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

    getTagByName(name: string, trainingId: number) {
        this.tagService.getTagByName(name)
            .subscribe(
                (response: any) => {
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

    affectFormationToCategory(trainingId: number) {
        this.categorieService.affectFormationToCategory(trainingId, this.categorieId)
            .subscribe(
                (response: any) => {
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }


    getCategorieByFormationId(){
        this.categorieService.getCategorieByFormations_Id(this.data.course.id).subscribe(
            value => this.categorieFormation = value
        )
    }

    addSeance(seance: Seance){
        this.seanceService.addSeance(seance).subscribe(
            (response: Seance) => {
                this.affectSeanceToFormation(response.id, this.data.course.id);
            },
            (error:HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    updateSeance(seance: Seance){
        this.seanceService.updateSeance(seance).subscribe();
    }

    deleteSeance(id: number){
        this.seanceService.deleteSeance(id).subscribe();
    }

    affectSeanceToFormation(idSeance: number, idFormation: number){
        this.formationService.affectSeanceToFormation(idSeance, idFormation).subscribe();
    }
}
