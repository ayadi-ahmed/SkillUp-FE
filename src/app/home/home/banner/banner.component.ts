import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, map, Observable, OperatorFunction} from "rxjs";
import {course} from "../../../Entities/courses";
import {HttpErrorResponse} from "@angular/common/http";
import {FormationService} from "../../../Services/formation.service";
import {Tag} from "../../../Entities/tag";
import {TagService} from "../../../Services/tag.service";

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
    public tagOrTitle: string = "";
    public courseTagsTitle: string[] = [];

    formatter = (result: string) => result.toUpperCase();
    searchbyTagOrTitle: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) =>
                term === '' ? [] : this.courseTagsTitle.filter((t) => t.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
            ),
        );

    constructor(private router: Router,
                private formationService: FormationService,
                private tagService: TagService) {
    }

    ngOnInit(): void {
        this.getAllFormations();
        this.getAllTags();
    }

    search() {
        this.router.navigate(['/courses'], {queryParams: {searchBy: this.tagOrTitle}});
    }

    getAllFormations() {
        this.formationService.getAllFormations().subscribe(
            (response: course[]) => {
                response.forEach(formation => {
                    if (!this.courseTagsTitle.includes(formation.titre.toUpperCase())) {
                        this.courseTagsTitle.push(formation.titre.toUpperCase());
                    }
                });
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    getAllTags(){
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
}
