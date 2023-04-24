import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Manager} from "../../../Entities/manager";
import {TrainingCenter} from "../../../Entities/training-center";
import {ManagerService} from "../../../Services/manager.service";
import {TrainingCenterService} from "../../../Services/training-center.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-signup-center',
    templateUrl: './signup-center.component.html',
    styleUrls: ['./signup-center.component.css']
})
export class SignupCenterComponent implements OnInit, OnDestroy {

    private subscription: Subscription | undefined;
    public manager: Manager = {
        id: 0,
        email: "",
        mdp: "",
        role: null,
        nom: "",
        prenom: "",
        dateNaissance: "",
        tel: null,
        centreFormation: []
    }

    public center: TrainingCenter = {
        dateCreation: "",
        description: "",
        etatDemandeInscription: null,
        logo: "",
        matriculeFiscal: "",
        adresse: "",
        email: "",
        id: 0,
        manager: null,
        nom: "",
        rib: 0,
        tel: null
    }

    constructor(private managerService: ManagerService,
                private trainingCenterService: TrainingCenterService,
                private router: Router) {
    }

    ngOnInit(): void {
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    addCenter() {
        this.subscription = this.managerService
            .addManager(this.manager)
            .subscribe(
                (response: Manager) => {
                    this.manager.id = response.id;
                    this.trainingCenterService
                        .addTrainingCenter(this.center)
                        .subscribe(
                            (response: TrainingCenter) => {
                                this.managerService
                                    .affectCenterToManager(response.id, this.manager.id)
                                    .subscribe(value => window.location.reload());
                            },
                            (error: HttpErrorResponse) => {
                                console.log(error.message);
                            }
                        )
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }
}
