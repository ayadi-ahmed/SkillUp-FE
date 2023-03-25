import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../../Services/authentification.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private userAuthentificationService: AuthentificationService,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    public formData = {
        email: "",
        password: ""
    }

    public login() {
        this.userAuthentificationService.login(this.formData.email, this.formData.password).subscribe(
            (response: any) => {
                if (response == null) {
                    alert("Vérifier vos coordonnées!")
                } else {
                    this.userAuthentificationService.setUserId(response.id);
                    this.userAuthentificationService.setRoles(response.role);
                    if (response.role === 'CANDIDAT') {
                        this.router.navigate(['/']);
                    } else if (response.role == 'MANAGER') {
                        this.router.navigate(['/']);
                    } else if (response.role == 'ADMIN') {
                        this.router.navigate(['/']);
                    }
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }


}
