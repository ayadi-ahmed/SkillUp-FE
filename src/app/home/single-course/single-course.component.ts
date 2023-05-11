import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormationService} from "../../Services/formation.service";
import {course} from "../../Entities/courses";
import {HttpErrorResponse} from "@angular/common/http";
import {Manager} from "../../Entities/manager";
import {TransactionCandidatService} from "../../Services/transaction-candidat.service";
import {TrainingCenterService} from "../../Services/training-center.service";
import {AuthentificationService} from "../../Services/authentification.service";
@Component({
    selector: 'app-single-course',
    templateUrl: './single-course.component.html',
    styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {

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
    public center : any;
    public dateDebut= new Date;
    public dateFin= new Date;
    public transactions: any[] = [];
    public role :string = "";
    public subscribed: boolean = false;
    public currentDate: Date = new Date();
    constructor(private route: ActivatedRoute,
                private formationService: FormationService,
                private router: Router,
                private transactionCandidatService: TransactionCandidatService,
                private trainingCenterService: TrainingCenterService,
                private authentificationService: AuthentificationService) {
    }

    ngOnInit(): void {
        this.getCourseId();
        this.getCourseById();
        this.getTransactionClientsByFormation_Id();
        this.getCentreFormationByFormations_Id();
        this.role = this.authentificationService.getRole();
        if(this.role == 'CANDIDAT'){
            this.getClientTransactions();
        }
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
                (response: course) => {
                    this.course = response;
                    this.dateDebut = new Date(response.dateDebut);
                    this.dateFin = new Date(response.dateFin);
                    this.currentDate = new Date();
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

    getCentreFormationByFormations_Id(){
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
                        if (s.formation.id == this.course.id){
                            this.subscribed = true
                        }
                    }
                }
            )
    }

}
