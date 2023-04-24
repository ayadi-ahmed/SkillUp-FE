import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../Services/formation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {course} from "../../Entities/courses";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private courseId = 0;
  public course: course = {
    dateDebut: "",
    dateFin: "",
    description: "",
    id: 0,
    img: "",
    nbMaxCan: null,
    offres: [],
    prix: null,
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

  redirect() {
    this.router.navigate(['/thank-you']);
  }
}
