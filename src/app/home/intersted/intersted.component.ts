import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../Services/authentification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../Services/formation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {course} from "../../Entities/courses";
import {TransactionCandidatService} from "../../Services/transaction-candidat.service";
import {CandidatService} from "../../Services/candidat.service";

@Component({
  selector: 'app-intersted',
  templateUrl: './intersted.component.html',
  styleUrls: ['./intersted.component.css']
})
export class InterstedComponent implements OnInit {

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
  constructor(private router: Router,
              private route: ActivatedRoute,
              private formationService: FormationService,
) {
  }

  ngOnInit(): void {
    this.getCourseId();
    this.getCourseById();

  }

  public formData = {
    email: "",
    password: ""
  }

  getCourseId() {
    this.route.params
      .subscribe(params => {
        this.courseId = params['id'];

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


  redirect() {
    this.router.navigate(['/thank-you']);
  }
}







