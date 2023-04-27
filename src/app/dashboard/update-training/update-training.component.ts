import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {CategorieService} from "../../Services/categorie.service";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Tag} from "../../Entities/tag";
import {TagService} from "../../Services/tag.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, Observable, startWith} from "rxjs";
import {FormationService} from "../../Services/formation.service";

@Component({
    selector: 'app-update-training',
    templateUrl: './update-training.component.html',
    styleUrls: ['./update-training.component.css']
})
export class UpdateTrainingComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                private categorieService: CategorieService,
                private tagService: TagService,
                private formationService: FormationService) {
        this.filteredTags = this.tagCtrl.valueChanges.pipe(
            startWith(null),
            map((tag: string | null) => (tag ? this._filter(tag) : this.tags.slice())),
        );
    }

    public categories: any[] = [];
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
                window.location.reload();
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        );
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
}
