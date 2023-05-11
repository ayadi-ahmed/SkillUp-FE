import {Component, OnDestroy, OnInit} from '@angular/core';
import {Candidat} from "../../../Entities/candidat";
import {CandidatService} from "../../../Services/candidat.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-signup-candidat',
    templateUrl: './signup-candidat.component.html',
    styleUrls: ['./signup-candidat.component.css']
})
export class SignupCandidatComponent implements OnInit, OnDestroy {

    public image: any = {
        file: new File([], ""),
        url: ""
    }
    private subscription: Subscription | undefined;
    public candidat: Candidat = {
        adresse: "",
        dateNaissance: "",
        email: "",
        fonction: "",
        id: 0,
        mdp: "",
        nom: "",
        prenom: "",
        role: null,
        tel: null,
        img: ""
    }

    constructor(private candidatService: CandidatService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    addCandidat() {
        const candidatFormData = this.prepareFormData(this.candidat, this.image);
        this.subscription = this.candidatService
            .addCandidat(candidatFormData).subscribe(
                (response: any) => {
                    this.router.navigate(['/'])
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

    prepareFormData(candidat: any, image: any): FormData {
        const formData = new FormData();
        formData.append(
            'candidat',
            new Blob([JSON.stringify(candidat)], {type: 'application/json'})
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

