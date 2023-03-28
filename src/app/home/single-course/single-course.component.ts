import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormationService} from "../../Services/formation.service";
import {course} from "../../Entities/courses";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-single-course',
    templateUrl: './single-course.component.html',
    styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {

    private courseId = 0;
    public course: course = {
        dateDebut: "",
        dateFin: "",
        description: "",
        id: 0,
        img: "",
        nbMaxCan: null,
        prix: null,
        titre: ""

    }
    constructor(private route: ActivatedRoute,
                private formationService: FormationService) {
    }

    ngOnInit(): void {
        this.getCourseId();
        this.getCourseById();
    }

    getCourseId() {
        this.route.queryParams
            .subscribe(params => {
                this.courseId = params['id']
            });
    }

    getCourseById(){
        this.formationService.getFormationById(this.courseId)
            .subscribe(
                (response: course) => {
                    this.course = response;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

}
