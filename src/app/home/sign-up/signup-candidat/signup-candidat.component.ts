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
        role: "",
        tel: 0
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
        this.subscription = this.candidatService
            .addCandidat(this.candidat)
            .subscribe(
                (response: any) => {
                    this.router.navigate(['/signup'])
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }
}

