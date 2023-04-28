import {Component, OnInit} from '@angular/core';
import {DataService} from "../../Services/data.service";
import {ManagerService} from "../../Services/manager.service";
import {AuthentificationService} from "../../Services/authentification.service";
import {Manager} from "../../Entities/manager";
import {HttpErrorResponse} from "@angular/common/http"
import {DatePipe, Location} from '@angular/common';
import {TrainingCenterService} from "../../Services/training-center.service";
import {AbonnementService} from "../../Services/abonnement.service";
import {Abonnement} from "../../Entities/abonnement";
import {TransactionCentreService} from "../../Services/transaction-centre.service";


@Component({
    selector: 'app-checkout-abonnement',
    templateUrl: './checkout-abonnement.component.html',
    styleUrls: ['./checkout-abonnement.component.css'],
    providers: [DatePipe]

})
export class CheckoutAbonnementComponent implements OnInit {

    public manager: Manager = {
        centreFormation: [],
        dateNaissance: "",
        email: "",
        id: 0,
        mdp: "",
        nom: "",
        prenom: "",
        role: "",
        tel: null
    };

    public abonnement: Abonnement = {
        id: 0,
        dateDebut: "",
        dateFin: "",
        type: ""
    }
    public data: any;
    public centers: any[] = [];
    public center: any = "";
    myDate = new Date();
    date: any;
    today = new Date();
    dateAfter30 = new Date(this.today.getTime() + 30 * 24 * 60 * 60 * 1000);
    dateAfter30Days: any;
    dateAfterOneYear = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate());
    dateAfter1Year: any;



    constructor(private dataService: DataService,
                private managerService: ManagerService,
                private authentificationService: AuthentificationService,
                private location: Location,
                private trainingCenterService: TrainingCenterService,
                private abonnementService: AbonnementService,
                private datePipe: DatePipe,
                private transactionCentreService: TransactionCentreService) {
        this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
        this.dateAfter30Days = this.datePipe.transform(this.dateAfter30, 'yyyy-MM-dd');
        this.dateAfter1Year = this.datePipe.transform(this.dateAfterOneYear, 'yyyy-MM-dd');
    }
    ngOnInit(): void {
        this.getManagerById();
        this.data = this.dataService.getData();
        if (this.data.type == "") {
            this.location.back();
        }
        this.getCentersByManagerId();
    }

    public getManagerById() {
        this.managerService.getManagerById(this.authentificationService.getUserId())
            .subscribe(
                (response: any) => {
                    this.manager = response;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            );
    }

    public getCentersByManagerId() {
        this.trainingCenterService.getAllByManagerId(this.authentificationService.getUserId())
            .subscribe(
                (response: any[]) => {
                    this.centers = response;
                }
            )
    }

    buy() {
        if (this.data.duree == "month"){
            this.abonnement.dateFin = this.dateAfter30Days;
        }else if (this.data.duree == "year"){
            this.abonnement.dateFin = this.dateAfter1Year;
        }
        this.abonnement.dateDebut = this.date;
        this.abonnement.type = this.data.type;
        console.log(this.abonnement);
        this.abonnementService.addAbonnement(this.abonnement)
            .subscribe(
                (response: Abonnement) => {
                    this.addTransaction(response.id);
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            );
    }

    addTransaction(abonnementId: number){
        var transaction = {};
        this.transactionCentreService.addTransaction(transaction)
            .subscribe(
                (response: any) => {
                    this.affectTransactionToCenter(this.center, response.id, abonnementId);
                }
            )
    }

    affectTransactionToCenter(centerId: number, transactionId: number, abonnementId: number){
        this.transactionCentreService.addTransactionToCentre(centerId, transactionId)
            .subscribe(
                (response: any) => {
                    this.affectTransactionToAbonnement(abonnementId, response.id);
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    affectTransactionToAbonnement(abonnementId: number, transactionId: number){
        this.transactionCentreService.addTransactionToAbonnement(abonnementId, transactionId)
            .subscribe(
                (response: any) => {
                    window.location.reload();
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

}
