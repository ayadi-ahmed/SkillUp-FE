import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../Services/formation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {course} from "../../Entities/courses";
import {TransactionCandidatService} from "../../Services/transaction-candidat.service";
import {TransactionClient} from "../../Entities/transaction-client";
import {AuthentificationService} from "../../Services/authentification.service";
import {log} from "ng-zorro-antd/core/logger";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public courseId = 0;
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
  };
  public transaction : TransactionClient = {
    client: 0, formation: 0,
    date: "", heure: "", id: 0, valeur: 0

  }

  constructor(private route: ActivatedRoute,
              private formationService: FormationService,
              private router:Router,
              private trancationService: TransactionCandidatService,
              private authService: AuthentificationService) {
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
     this.formationService.getFormationById(this.courseId).subscribe((res:course)=>{
       this.transaction.valeur = res.prix
       this.transaction.formation=res.id;
       console.log("redirect, formID "+res.id);


       this.trancationService.addTransaction(this.transaction).subscribe(res1=>{
         this.trancationService.affectTransacationToClient(this.authService.getUserId(),res1.id).subscribe(res2=>{

             this.router.navigate(['/thank-you']);
           },
           (error: HttpErrorResponse) => {
             console.log(error.message);
           })

       },(error: HttpErrorResponse) => {
         console.log(error.message);
       })
     },(error: HttpErrorResponse) => {
       console.log(error.message)
     });


  }
}
