import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormationService} from "../../Services/formation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {course} from "../../Entities/courses";
import {Router} from "@angular/router";

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

    public formations: course[] = [];

    constructor(private formationService: FormationService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getAllFormations()
    }

    ngOnDestroy(): void {
    }

    getAllFormations() {
        this.formationService.getAllFormations().subscribe(
            (response: any) => {
                this.formations = response;
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    getDetails(courseId: number) {
        this.router.navigate(['/course'], {queryParams: {id: courseId}});
    }

}
