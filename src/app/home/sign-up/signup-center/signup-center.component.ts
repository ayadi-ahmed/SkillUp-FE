import {Component, OnDestroy, OnInit} from '@angular/core';
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

    public image: any = {
        file: new File([], ""),
        url: ""
    }

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
    public disableButton = false;

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
        this.disableButton = true;
        const formationFormData = this.prepareFormData(this.center, this.image)
        this.subscription = this.managerService.addManager(this.manager)
            .subscribe(
                (response: Manager) => {
                    this.manager.id = response.id;
                    this.trainingCenterService.addTrainingCenter(formationFormData)
                        .subscribe(
                            (response: TrainingCenter) => {
                                this.managerService.affectCenterToManager(response.id, this.manager.id)
                                    .subscribe();
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

    prepareFormData(centre: any, image: any): FormData {
        const formData = new FormData();
        formData.append(
            'centre',
            new Blob([JSON.stringify(centre)], {type: 'application/json'})
        );
        formData.append(
            'image',
            image.file,
            image.file.name
        );
        return formData;
    }

    onFileSelected(event: any) {
        if (event.target.files) {
            const file = event.target.files[0];
            this.image = {
                file: file,
                url: null
            };
        }
    }
}
