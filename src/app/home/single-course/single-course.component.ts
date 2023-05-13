import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../Services/formation.service";
import {course} from "../../Entities/courses";
import {HttpErrorResponse} from "@angular/common/http";
import {TransactionCandidatService} from "../../Services/transaction-candidat.service";
import {TrainingCenterService} from "../../Services/training-center.service";
import {AuthentificationService} from "../../Services/authentification.service";
import {CandidatService} from "../../Services/candidat.service";
import {Candidat} from "../../Entities/candidat";
import {Avis} from "../../Entities/Avis";
import {RatingService} from "../../Services/rating.service";

@Component({
    selector: 'app-single-course',
    templateUrl: './single-course.component.html',
    styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {
    addComment = true;
    avis: Avis = {
        client: null,
        commentaire: "",
        date: "",
        formation: null,
        id: 0,
        note: 0
    }

    private courseId = 0;
    public course: any = {
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
    public center: any;
    public dateDebut = new Date;
    public dateFin = new Date;
    public transactions: any[] = [];
    public role: string = "";
    public subscribed: boolean = false;
    public currentDate: Date = new Date();
    public user: Candidat = {
        adresse: "",
        dateNaissance: "",
        email: "",
        fonction: "",
        id: 0,
        img: "",
        mdp: "",
        nom: "",
        prenom: "",
        role: "undefined",
        tel: 0

    };

    constructor(private route: ActivatedRoute,
                private formationService: FormationService,
                private router: Router,
                private transactionCandidatService: TransactionCandidatService,
                private trainingCenterService: TrainingCenterService,
                private authentificationService: AuthentificationService,
                private candidatService: CandidatService,
                private ratingService: RatingService) {
    }

    ngOnInit(): void {
        this.getCourseId();
        this.getCourseById();
        this.getTransactionClientsByFormation_Id();
        this.getCentreFormationByFormations_Id();
        this.role = this.authentificationService.getRole();
        if (this.role == 'CANDIDAT') {
            this.getClientTransactions();
            this.getCandidatById();
        }
    }

    getCandidatById() {
        this.candidatService.getCandidatById(this.authentificationService.getUserId())
            .subscribe(value => this.user = value)
    }

    getCourseId() {
        this.route.params
            .subscribe(params => {
                this.courseId = params['id'];
            });
    }

    getCourseById() {
        this.formationService.getFormationById(this.courseId)
            .subscribe(
                (response: any) => {
                    this.course = response;
                    this.dateDebut = new Date(response.dateDebut);
                    this.dateFin = new Date(response.dateFin);
                    this.currentDate = new Date();
                    for (let a of response.avis){
                        if (a.client.id == this.authentificationService.getUserId()){
                            this.addComment = false;
                        }
                    }
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

    getTransactionClientsByFormation_Id() {
        this.transactionCandidatService.getTransactionClientsByFormation_Id(this.courseId)
            .subscribe(
                (response: any[]) => {
                    this.transactions = response;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    getCentreFormationByFormations_Id() {
        this.trainingCenterService.getCentreFormationByFormations_Id(this.courseId)
            .subscribe(
                (response: any) => {
                    this.center = response;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    getClientTransactions() {
        this.transactionCandidatService.getTransactionsByClientId(this.authentificationService.getUserId())
            .subscribe(
                (response: any[]) => {
                    for (let s of response) {
                        if (s.formation.id == this.course.id) {
                            this.subscribed = true
                        }
                    }
                }
            )
    }

    addAvis() {
        this.ratingService.addAvis(this.avis).subscribe(
            (response: Avis) => {
                this.affectAvisToCandidat(this.user.id, response.id);
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    affectAvisToCandidat(idc: number, ida: number) {
        this.ratingService.affectAvisToCandidat(idc, ida).subscribe(
            (response: any) => {
                this.affectAvisToCourse(this.courseId, ida);
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    affectAvisToCourse(idf: number, ida: number) {
        this.ratingService.affectAvisToCourse(idf, ida).subscribe(
            (response: any) => {
                this.addComment = false;
                this.getCourseById();
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

}
