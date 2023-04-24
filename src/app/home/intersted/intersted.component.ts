import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../Services/authentification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../Services/formation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {course} from "../../Entities/courses";

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
    prix: null,
    titre: ""

  }
  constructor(private userAuthentificationService: AuthentificationService,
              private router: Router, private route: ActivatedRoute,
              private formationService: FormationService) {
  }

  ngOnInit(): void {
    this.getCourseId();
    this.getCourseById();

  }

  public formData = {
    email: "",
    password: ""
  }

  public login() {
    this.userAuthentificationService.login(this.formData.email, this.formData.password).subscribe(
      (response: any) => {
        if (response == null) {
          alert("Vérifier vos coordonnées!")
        } else {
          this.userAuthentificationService.setUserId(response.id);
          this.userAuthentificationService.setRoles(response.role);
          if (response.role === 'CANDIDAT') {
            this.router.navigate(['/']);
          } else if (response.role == 'MANAGER') {
            this.router.navigate(['/']);
          } else if (response.role == 'ADMIN') {
            this.router.navigate(['/']);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
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







