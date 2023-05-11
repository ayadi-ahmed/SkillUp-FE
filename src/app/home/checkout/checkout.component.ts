import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../Services/formation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {course} from "../../Entities/courses";
import {TransactionCandidatService} from "../../Services/transaction-candidat.service";
import {TransactionClient} from "../../Entities/transaction-client";
import {AuthentificationService} from "../../Services/authentification.service";
import {CandidatService} from "../../Services/candidat.service";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


    public courseId = 0;
    userId: number = 0;
    public subscribed: boolean = false;
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
    role: "CANDIDAT",
    tel: 0
  };

    public transaction: TransactionClient = {
        client: this.candidat,
        formation: this.course,
        date: "",
        heure: "",
        id: 0,
        valeur: 0
    };





  constructor(private route: ActivatedRoute,
              private formationService: FormationService,
              private router:Router,
              private trancationService: TransactionCandidatService,
              private authService: AuthentificationService,
              private candidatService:CandidatService,
             private transactionCandidatService: TransactionCandidatService)
                {
  }

  ngOnInit(): void {
    this.getCourseId();
    this.getCandidatId();
    this.getCourseByIdAndCandidatById();
        this.getClientTransactions();


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

          this.candidatService.getCandidatById(this.userId).subscribe((res:Candidat)=>{
            this.candidat=res;
          },
            (error: HttpErrorResponse) => {
              console.log(error.message);



    getCandidatId() {
        this.userId = this.authService.getUserId();
    }

    getCourseId() {
        this.route.params
            .subscribe(params => {
                this.courseId = params['id'];

            });
    }

    getCourseByIdAndCandidatById() {
        this.formationService.getFormationById(this.courseId).subscribe((response: course) => {
                this.course = response;
                this.candidatService.getCandidatById(this.userId).subscribe((res: any) => {
                        this.candidat.id = res.id;
                        this.candidat.nom = res.nom;
                        this.candidat.prenom = res.prenom;
                        this.candidat.email = res.email;
                        this.candidat.tel = res.tel;
                        this.candidat.adresse = res.adresse;
                        this.candidat.dateNaissance = res.dateNaissance;
                        this.candidat.fonction = res.fonction;
                        this.candidat.img = res.img;
                        this.candidat.role = res.role;
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
        this.formationService.getFormationById(this.courseId).subscribe((res: course) => {
            this.transaction.valeur = res.prix;
            this.transaction.client.id = this.userId;
            this.transaction.formation.id = this.courseId;

            this.trancationService.addTransaction(this.transaction).subscribe((res1: TransactionClient) => {

                this.trancationService.affectTransacationToClient(this.authService.getUserId(), res1.id).subscribe((res2: TransactionClient) => {

                    this.trancationService.affectFormationToTransaction(res.id, res1.id).subscribe(res3 => {
                            this.updateCandidat();
                        },
                        (error: HttpErrorResponse) => {
                            console.log(error.message);
                        })

                }, (error: HttpErrorResponse) => {
                    console.log(error.message);
                })
            }, (error: HttpErrorResponse) => {
                console.log(error)
            })
        }, (error: HttpErrorResponse) => {
            console.log(error.message)
        });
    }

    updateCandidat() {
        this.candidatService.updateCandidatCheckout(this.candidat).subscribe(
            (response: any) => {
                this.router.navigate(['/thank-you']);
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    getClientTransactions() {
        this.transactionCandidatService.getTransactionsByClientId(this.userId)
            .subscribe(
                (response: any[]) => {
                    for (let s of response) {
                        if (s.formation.id == this.course.id){
                            this.subscribed = true
                        }
                    }
                }
            )
    }
}
