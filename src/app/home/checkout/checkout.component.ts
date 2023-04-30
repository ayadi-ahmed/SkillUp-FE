import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../Services/formation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {course} from "../../Entities/courses";
import {TransactionCandidatService} from "../../Services/transaction-candidat.service";
import {TransactionClient} from "../../Entities/transaction-client";
import {AuthentificationService} from "../../Services/authentification.service";
import {log} from "ng-zorro-antd/core/logger";
import {Candidat} from "../../Entities/candidat";
import {CandidatService} from "../../Services/candidat.service";
import {Manager} from "../../Entities/manager";

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

  candidat:Candidat = {
    adresse: "",
    dateNaissance: "",
    email: "",
    fonction: "",
    id: 0,
    mdp: "",
    nom: "",
    prenom: "",
    role: "",
    tel: 0
  };
  public transaction : TransactionClient = {
    client:this.candidat, formation: this.course ,
    date: "", heure: "", id: 0, valeur: 0

  };


   userId: number=0;

  constructor(private route: ActivatedRoute,
              private formationService: FormationService,
              private router:Router,
              private trancationService: TransactionCandidatService,
              private authService: AuthentificationService,
              private candidatService:CandidatService) {
  }

  ngOnInit(): void {
    this.getCourseId();
    this.getCandidatId();
    this.getCourseByIdAndCandidatById();


  }

  getCandidatId(){
    this.userId = this.authService.getUserId();
  }

  getCourseId() {
    this.route.params
      .subscribe(params => {
        this.courseId = params['id'];
        console.log(params['id']);
      });
  }

  getCourseByIdAndCandidatById(){
    this.formationService.getFormationById(this.courseId).subscribe((response: course) => {
          this.course = response;
          console.log(response);

          this.candidatService.getCandidatById(this.userId).subscribe((res:Candidat)=>{
            this.candidat=res;
            console.log(this.candidat);
          },
            (error: HttpErrorResponse) => {
              console.log(error.message);
            });
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      )
  }






  redirect() {
     this.formationService.getFormationById(this.courseId).subscribe((res:course)=>{
       this.transaction.valeur = res.prix;
       console.log("formation working"+res);

       this.trancationService.addTransaction(this.transaction).subscribe((res1:TransactionClient)=>{
         console.log("add trasnact working "+res1);

         this.trancationService.affectTransacationToClient(this.authService.getUserId(),res1.id).subscribe((res2:TransactionClient)=>{
           console.log("add trasn to client working "+res2);

           this.trancationService.affectFormationToTransaction(res.id,res1.id).subscribe(res3=>{
               console.log("add formation to trans working", res3);

               this.router.navigate(['/thank-you']);
             },
             (error: HttpErrorResponse) => {
               console.log(error.message);
             })

         },(error: HttpErrorResponse) => {
           console.log(error.message);
         })
       },(error: HttpErrorResponse) => {
         console.log(error)
       })
           },(error: HttpErrorResponse) => {
       console.log(error.message)
     });


  }
}
