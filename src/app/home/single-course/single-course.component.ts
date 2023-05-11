import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../Services/formation.service";
import {course} from "../../Entities/courses";
import {HttpErrorResponse} from "@angular/common/http";
import {Manager} from "../../Entities/manager";

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
      offres: [],
      prix: 0,
      titre: ""
    }

  constructor(private route: ActivatedRoute,
                private formationService: FormationService,
              private router:Router) {
    }

    ngOnInit(): void {
        this.getCourseId();
        this.getCourseById();

    }

    getCourseId() {
        this.route.params
            .subscribe(params => {
                this.courseId = params['id'];
                console.log(params['id']);
            });
    }

    getCourseById(){
        this.formationService.getFormationById(this.courseId)
            .subscribe(
                (response: course) => {
                    this.course = response;
                    console.log(response);

                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

  getDetails(courseId: number) {
    this.router.navigate([`/checkout/${courseId}`]);
  }

  getDetails1(courseId: number) {
    this.router.navigate([`/interested/${courseId}`]);
  }

}
