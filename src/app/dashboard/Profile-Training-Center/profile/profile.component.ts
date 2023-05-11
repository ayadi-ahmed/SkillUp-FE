import {Component, OnInit} from '@angular/core';
import {Candidat} from "../../../Entities/candidat";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../../Services/authentification.service";
import {CandidatService} from "../../../Services/candidat.service";
import {Manager} from "../../../Entities/manager";
import {ManagerService} from "../../../Services/manager.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from '@angular/material/snack-bar';
import {UpdateCenterComponent} from "../update-center/update-center.component";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    userId: number = 0;
    userRole: string = "";
    candidat: Candidat = {
        adresse: "",
        dateNaissance: "",
        email: "",
        fonction: "",
        id: 0,
        mdp: "",
        nom: "",
        prenom: "",
        role: "CANDIDAT",
        tel: 0,
        img: ""
    };

    manager: Manager = {
        centreFormation: [],
        dateNaissance: "",
        email: "",
        id: 0,
        mdp: "",
        nom: "",
        prenom: "",
        role: "MANAGER",
        tel: 0,
        img: ""

    }
    public image: any = {
        file: new File([], ""),
        url: ""
    }
    imageUrl: string = "";
    public emailExists: boolean = false;


    constructor(public router: Router,
                private authService: AuthentificationService,
                private candidatService: CandidatService,
                private managerService: ManagerService,
                private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        this.getCandidatId();
        this.getProfilByUserId(this.userId);
    }

    getCandidatId() {
        this.userId = this.authService.getUserId();
        this.userRole = this.authService.getRole();
    }

    getProfilByUserId(clientId: number) {
        if (this.userRole == "CANDIDAT") {
            this.candidatService.getCandidatById(clientId).subscribe((res: Candidat) => {
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
            });
        } else if (this.userRole == "MANAGER") {
            this.managerService.getManagerById(clientId).subscribe((res: Manager) => {
                this.manager.id = res.id;
                this.manager.nom = res.nom;
                this.manager.prenom = res.prenom;
                this.manager.email = res.email;
                this.manager.tel = res.tel;
                this.manager.email = res.email;
                this.manager.img = res.img;
                this.candidat.role = res.role;
            })
        }

    }


    updateUser() {
        if (this.userRole == 'CANDIDAT') {
            const userFormData = this.prepareFormData(this.candidat, this.image)
            this.candidatService.updateCandidat(userFormData).subscribe(
                (res: Candidat) => {
                    this.openSnackBar();
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                });
        } else if (this.userRole == 'MANAGER') {
            const userFormData = this.prepareFormData(this.manager, this.image)
            this.managerService.updateManager(userFormData).subscribe(
                (res: Manager) => {
                    this.openSnackBar();
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                });
        }
    }


    onFileSelected(event: any) {
        if (event.target.files) {
            const file = event.target.files[0];
            this.image = {
                file: file,
                url: null
            };
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.imageUrl = reader.result as string;
            };
        }
    }

    prepareFormData(user: any, image: any): FormData {
        const formData = new FormData();
        formData.append(
            'user',
            new Blob([JSON.stringify(user)], {type: 'application/json'})
        );
        formData.append(
            'image',
            image.file,
            image.file.name
        );
        return formData;
    }


    getUserByEmail() {
        if (this.userRole == 'MANAGER') {
            this.authService.getUserByEmail(this.manager.email)
                .subscribe(
                    (response: any) => {
                        if (response != null && response.email != this.authService.getUserEmail()) {
                            this.emailExists = true;
                        } else {
                            this.emailExists = false;
                        }
                    }, (error: HttpErrorResponse) => {
                        console.log(error.message);
                    }
                )
        } else if (this.userRole == 'CANDIDAT') {
            this.authService.getUserByEmail(this.candidat.email)
                .subscribe(
                    (response: any) => {
                        if (response != null && response.email != this.authService.getUserEmail()) {
                            this.emailExists = true;
                        } else {
                            this.emailExists = false;
                        }
                    }, (error: HttpErrorResponse) => {
                        console.log(error.message);
                    }
                )
        }
    }


    durationInSeconds = 5;

    openSnackBar() {
        this._snackBar.openFromComponent(UpdateCenterComponent, {
            duration: this.durationInSeconds * 1000,
        });
    }
}
